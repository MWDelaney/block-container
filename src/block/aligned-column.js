/**
 * BLOCK: block-aligned-column
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

registerBlockStyle('rebel/aligned-column', {
  name: 'align-start',
  label: 'Align Start',
  isDefault: true,
});

registerBlockStyle('rebel/aligned-column', {
  name: 'align-end',
  label: 'Align End',
});

registerBlockStyle('rebel/aligned-column', {
  name: 'align-center',
  label: 'Align Center',
});

registerBlockType( 'rebel/aligned-column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Aligned Column' ), // Block title.
	icon: 'align-none', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'column' ),
  ],
  attributes: {
		columnWidth: {
			type: 'integer',
			default: 50
    },
		columnWidthEdit: {
			type: 'string',
			default: '50%'
    },
  },

	edit: ( props ) => {

    const { attributes, setAttributes } = props;
    const columnWidthEdit = attributes.columnWidth + "%";

		return (
			<div className={ props.className }>
       <InspectorControls>
        <PanelBody
              title="Column Width"
              icon=""
              initialOpen={ true }
          >
          <RangeControl
            label="Column Width"
            value={attributes.columnWidth}
            min={1}
            max={100}
            onChange={value => {
              setAttributes({ columnWidth: value })
              setAttributes({ columnWidthEdit: value + "%"});
            }}
          />
          </PanelBody>
        </InspectorControls>
        <div className="aligned-column-inner" style={{ flexBasis: columnWidthEdit }}>
          <InnerBlocks />
        </div>
			</div>
		);
	},

	save: ( props ) => {
    const columnWidth = props.attributes.columnWidthEdit;

		return (
			<div className={ props.className }>
        <div className="aligned-column-inner" style={{ flexBasis: columnWidth }}>
          <InnerBlocks.Content />
        </div>
			</div>
		);
	},
});
