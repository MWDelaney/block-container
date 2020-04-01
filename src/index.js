/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import {
  InnerBlocks,
  ColorPalette,
  InspectorControls,
} from '@wordpress/block-editor';

import {
  PanelBody,
  ToggleControl,
} from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/container', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Container', 'create-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'',
		'create-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'editor-contract',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
    html: false,
    align: ["full"],
  },

  attributes: {
    align: {
      type: 'string',
      default: 'full',
    },
    backgroundWidth: {
      type: 'string',
      default: 'full',
    },
    color: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
      default: 'transparent',
    }
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 *
	 * @return {WPElement} Element to render.
	 */
	edit( { className, attributes, setAttributes } ) {
    const { color, backgroundColor, backgroundWidth } = attributes;
    const style = {
      color: color,
      backgroundColor: backgroundColor,
     };

     const wrapperStyles = backgroundWidth ? style : [];
     const containerStyles = backgroundWidth ? [] : style;

		return (
			<div className={ className } style={ wrapperStyles }>
      <InspectorControls>
					<PanelBody title={ __( 'Color settings' ) } isnitialOpen={true}>
          <ToggleControl
              label="Background Full Width?"
              help={
                backgroundWidth
                  ? "Background color will be full-width."
                  : "Background color will be contained."
              }
              checked={backgroundWidth}
              onChange={value => {
                setAttributes({ backgroundWidth: value });
              }}
            />
          <label className="blocks-base-control__label">Text Color</label>
            <ColorPalette
              value={ color }
              onChange={ value => {
                setAttributes({color: value})
              }}
            />
            <label className="blocks-base-control__label">Background Color</label>
            <ColorPalette
              value={ backgroundColor }
              onChange={ value => {
                setAttributes({backgroundColor: value})
              }}
            />
          </PanelBody>
        </InspectorControls>
        <div className="container" style={ containerStyles }>
          <InnerBlocks />
        </div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by the block editor into `post_content`.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
	 *
	 * @return {WPElement} Element to render.
	 */
	save({ className }) {
		return (
      <div className={ className }>
        <div className="container">
          <InnerBlocks.Content />
        </div>
      </div>
		);
	},
} );
