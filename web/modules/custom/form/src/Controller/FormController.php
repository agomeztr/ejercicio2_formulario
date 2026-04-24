<?php
namespace Drupal\pokedex\Controller;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Xss;

class PokedexController extends ControllerBase {
  public function content() {
    //Create the content elements
    return [
      '#markup' => '
        
        ',
        '#attached' => [
            'library' => 'form/form',
        ],
        '#allowed_tags' => 
            array_merge(Xss::getHtmlTagList(), ['button'])
    ];
  }
}

?>