<?php
namespace Drupal\form\Controller;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Xss;

class FormController extends ControllerBase {
  public function content() {
    //Create the content elements
    return [
      '#markup' => '
            <div id="message" class="hidden">
                <button id="cerrarMensaje">X</button>
                <i id="icon"></i>
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
              <button type="submit" class="btn btn-primary" aria-label="Send form" id="send">Enviar</button>
            </form>
        ',
        '#attached' => [
            'library' => 'form/form',
        ],
        '#allowed_tags' => 
            array_merge(Xss::getHtmlTagList(), ['button', 'form', 'div', 'label', 'input', 'select', 'textarea'])
    ];
  }
}

?>