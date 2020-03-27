/**
 * BLOCK: block-container
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( 'rebel/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Container' ), // Block title.
	icon: 'editor-contract', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Container' ),
  ],

  supports: {
    align: ["full"],
  },

	edit: ( props ) => {
		return (
			<div className={ props.className }>
        <div className="container">
          <InnerBlocks />
        </div>
			</div>
		);
	},

    save: ( props ) => {
      return (
        <div className={ props.className }>
        <div className="container">
          <InnerBlocks.Content />
        </div>
			</div>
      );
    },
});
