<?php
/**
 * Cascading drop down front end select layout
 */
defined('JPATH_BASE') or die;

use Joomla\CMS\Language\Text;

$d = $displayData;

// If add and select put them in a button group.
if ($d->frontEndSelect && $d->frontEndAdd && $d->editable) :
	// Set position inherit otherwise btn-group blocks selection of checkboxes
?>
	<div class="btn-group" style="position:inherit">
<?php
endif;

if ($d->frontEndSelect && $d->editable) :
	Text::script('PLG_ELEMENT_DBJOIN_SELECT');
?>
	<a href="<?php echo $d->chooseUrl; ?>" target="<?php echo $d->renderStyle ? '_blank' : '' ?>" formValue="<?php echo $d->formId; ?>" class="toggle-selectoption btn" title="<?php echo Text::_('COM_FABRIK_SELECT'); ?>">
		<?php echo FabrikHelperHTML::image('search', 'form', @$d->tmpl, array('alt' => Text::_('COM_FABRIK_SELECT'))); ?>
	</a>
	<?php if($d->refreshButton) : ?>
		<a class="btn refreshTree" title="<?php echo 'Atualizar árvore';?>">
			<?php echo FabrikHelperHTML::image('refresh.png', 'form', @$d->tmpl, array('alt' => 'Atualizar árvore')); ?>
		</a>
	<?php endif; ?>
<?php
endif;

if ($d->frontEndAdd && $d->editable) :
	Text::script('PLG_ELEMENT_DBJOIN_ADD');
	?>
	<a href="<?php echo $d->addURL; ?>" target="<?php echo $d->renderStyle ? '_blank' : '' ?>" formValue="<?php echo $d->formId; ?>" title="<?php echo Text::_('COM_FABRIK_ADD');?>" class="toggle-addoption btn">
		<?php echo FabrikHelperHTML::image('plus', 'form', @$d->tmpl, array('alt' => Text::_('COM_FABRIK_SELECT'))); ?>
	</a>
	<?php if($d->refreshButton) : ?>
		<a class="btn refreshTree" title="<?php echo 'Atualizar árvore';?>">
			<?php echo FabrikHelperHTML::image('refresh.png', 'form', @$d->tmpl, array('alt' => 'Atualizar árvore')); ?>
		</a>
	<?php else 
		Text::script('PLG_ELEMENT_DBJOIN_EDIT');
		?>
		<a href="<?php echo $d->addURL; ?>" title="<?php echo Text::_('COM_FABRIK_EDIT');?>" class="toggle-editoption btn">
			<?php echo FabrikHelperHTML::image('edit', 'form', @$d->tmpl, array('alt' => Text::_('COM_FABRIK_SELECT'))); ?>
		</a>
	<?php endif; ?>
<?php
endif;
// If add and select put them in a button group.
if ($d->frontEndSelect && $d->frontEndAdd && $d->editable) :
?>
	</div>
<?php
endif;
