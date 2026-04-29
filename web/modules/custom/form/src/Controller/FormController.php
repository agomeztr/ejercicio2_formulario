<?php

namespace Drupal\form\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Xss;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\user\Entity\User;

class FormController extends ControllerBase
{

  public static function access(AccountInterface $account)
  {
    if ($account->isAuthenticated()) {
      return AccessResult::allowed();
    }
    return AccessResult::forbidden('Debes iniciar sesión para poder realizar este formulario.');
  }

  protected Connection $database;

  public function __construct(Connection $database)
  {
    $this->database = $database;
  }

  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('database')
    );
  }

  public function submit(Request $request)
  {
    $data = json_decode($request->getContent(), TRUE);

    if (!$data) {
      return new JsonResponse(['status' => 'error', 'message' => 'No data'], 400);
    }

    if (
      empty($data['title']) ||
      empty($data['description']) ||
      empty($data['email']) ||
      empty($data['category']) ||
      empty($data['priority']) ||
      !filter_var($data['email'], FILTER_VALIDATE_EMAIL)
    ) {
      return new JsonResponse(['status' => 'error', 'message' => 'Datos inválidos'], 400);
    }

    $this->database->insert('requests')
      ->fields([
        'title' => strip_tags($data['title']),
        'description' => strip_tags($data['description']),
        'email' => $data['email'],
        'category' => strip_tags($data['category']),
        'priority' => (int) $data['priority'],
        'created' => \Drupal::time()->getRequestTime(),
      ])
      ->execute();

    return new JsonResponse(['status' => 'success']);
  }

  public function content()
  {
    //Create the content elements
    return [
      '#markup' => '
            <div id="message" class="hidden">
                <button id="cerrarMensaje">X</button>
                <i id="icon" class="bi"></i>
                <p id="text-message"></p>
            </div>
            <form>
              <div class="mb-2">
                <label for="title" class="form-label" aria-label="Title">Título *</label>
                <input type="text" class="form-control" id="title" aria-describedby="title">
              </div>
              <div class="mb-2">
                <label for="description" class="form-label" aria-label="Description">Descripción *</label>
                <textarea id="description" name="description" rows="4" cols="50"></textarea>
              </div>
              <div class="mb-2">
                <label for="email" class="form-label" aria-label="Email">Correo eletrónico *</label>
                <input type="email" class="form-control" id="email" aria-describedby="email">
              </div>
              <div class="mb-2">
                <label for="category" class="form-label" aria-label="Category">Categoría *</label>
                <select name="category" id="category"></select>
              </div>
              <div class="mb-2">
                <label for="priority" class="form-label" aria-label="priority">Prioridad *</label>
                <div id="priority"></div>
              </div>
              <button type="button" class="btn btn-primary" aria-label="Send form" id="send">Enviar</button>
            </form>
        ',
      '#attached' => [
        'library' => 'form/form',
      ],
      '#allowed_tags' =>
      array_merge(Xss::getHtmlTagList(), ['button', 'form', 'div', 'label', 'input', 'select', 'textarea', 'p', 'i'])
    ];
  }

  public function listAllRequests() {
    return $this->buildTable();
  }

  public function listUserRequests() {

    $uid = $this->currentUser()->id();
    $user = User::load($uid);

    if (!$user) {
      throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException();
    }

    $email = $user->getEmail();

    return $this->buildTable($email);
  }

  private function buildTable($email = NULL) {

  $header = [
    'id' => $this->t('ID'),
    'title' => $this->t('Título'),
    'email' => $this->t('Email'),
    'category' => $this->t('Categoría'),
    'priority' => $this->t('Prioridad'),
    'created' => $this->t('Fecha'),
  ];

  $query = $this->database->select('requests', 'r')
    ->fields('r')
    ->orderBy('created', 'DESC');

  if ($email) {
    $query->condition('email', $email);
  }

  $results = $query->execute();

  $rows = [];

  foreach ($results as $record) {
    $rows[] = [
      'id' => $record->id,
      'title' => $record->title,
      'email' => $record->email,
      'category' => $record->category,
      'priority' => $record->priority,
      'created' => \Drupal::service('date.formatter')
        ->format($record->created, 'short'),
    ];
  }

  return [
    '#type' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => $this->t('No hay solicitudes registradas.'),
  ];
}


}