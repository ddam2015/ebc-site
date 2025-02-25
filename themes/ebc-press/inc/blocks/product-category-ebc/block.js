/**
 * External dependencies
 */

import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	ServerSideRender,
} from '@wordpress/editor';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import GridContentControl from '@woocommerce/block-components/grid-content-control';
import GridLayoutControl from '@woocommerce/block-components/grid-layout-control';
import ProductCategoryControl from '@woocommerce/block-components/product-category-control';
import ProductOrderbyControl from '@woocommerce/block-components/product-orderby-control';
import { gridBlockPreview } from '@woocommerce/resource-previews';

/**
 * Component to handle edit mode of "Products by Category".
 */
class ProductByCategoryBlockEBC extends Component {
	static propTypes = {
		/**
		 * The attributes for this block
		 */
		attributes: PropTypes.object.isRequired,
		/**
		 * The register block name.
		 */
		name: PropTypes.string.isRequired,
		/**
		 * A callback to update attributes
		 */
		setAttributes: PropTypes.func.isRequired,

		// from withSpokenMessages
		debouncedSpeak: PropTypes.func.isRequired,
	};

	state = {
		changedAttributes: {},
		isEditing: false,
	};

	componentDidMount() {
		const { attributes } = this.props;

		if ( ! attributes.categories.length ) {
			// We've removed all selected categories, or no categories have been selected yet.
			this.setState( { isEditing: true } );
		}
	}

	startEditing = () => {
		this.setState( {
			isEditing: true,
			changedAttributes: {},
		} );
	};

	stopEditing = () => {
		this.setState( {
			isEditing: false,
			changedAttributes: {},
		} );
	};

	setChangedAttributes = ( attributes ) => {
		this.setState( ( prevState ) => {
			return {
				changedAttributes: {
					...prevState.changedAttributes,
					...attributes,
				},
			};
		} );
	};

	save = () => {
		const { changedAttributes } = this.state;
		const { setAttributes } = this.props;

		setAttributes( changedAttributes );
		this.stopEditing();
	};

	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const { isEditing } = this.state;
		const {
			columns,
			catOperator,
			contentVisibility,
			orderby,
			rows,
			alignButtons,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __(
						'Product Category EBC',
						'woocommerce'
					) }
					initialOpen={
						! attributes.categories.length && ! isEditing
					}
				>
					<ProductCategoryControl
						selected={ attributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							const changes = { categories: ids };

							// Changes in the sidebar save instantly and overwrite any unsaved changes.
							setAttributes( changes );
							this.setChangedAttributes( changes );
						} }
						operator={ catOperator }
						onOperatorChange={ ( value = 'any' ) => {
							const changes = { catOperator: value };
							setAttributes( changes );
							this.setChangedAttributes( changes );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'woocommerce' ) }
					initialOpen
				>
					<GridLayoutControl
						columns={ columns }
						rows={ rows }
						alignButtons={ alignButtons }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'woocommerce' ) }
					initialOpen
				>
					<GridContentControl
						settings={ contentVisibility }
						onChange={ ( value ) =>
							setAttributes( { contentVisibility: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Order By', 'woocommerce' ) }
					initialOpen={ false }
				>
					<ProductOrderbyControl
						setAttributes={ setAttributes }
						value={ orderby }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderEditMode() {
		const { attributes, debouncedSpeak } = this.props;
		const { changedAttributes } = this.state;
		const currentAttributes = { ...attributes, ...changedAttributes };
		const onDone = () => {
			this.save();
			debouncedSpeak(
				__(
					'Showing Products by Category block preview.',
					'woocommerce'
				)
			);
		};
		const onCancel = () => {
			this.stopEditing();
			debouncedSpeak(
				__(
					'Showing Products by Category block preview.',
					'woocommerce'
				)
			);
		};

		return (
			<Placeholder
				icon="category"
				label={ __(
					'Products by Category EBC',
					'woocommerce'
				) }
				className="wc-block-products-grid wc-block-products-category"
			>
				{ __(
					'EBC Display a grid of products from your selected categories.',
					'woocommerce'
				) }
				<div className="wc-block-products-category__selection">
					<ProductCategoryControl
						selected={ currentAttributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							this.setChangedAttributes( { categories: ids } );
						} }
						operator={ currentAttributes.catOperator }
						onOperatorChange={ ( value = 'any' ) =>
							this.setChangedAttributes( { catOperator: value } )
						}
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woocommerce' ) }
					</Button>
					<Button
						className="wc-block-products-category__cancel-button"
						isTertiary
						onClick={ onCancel }
					>
						{ __( 'Cancel', 'woocommerce' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	renderViewMode() {
		const { attributes, name } = this.props;
		const hasCategories = attributes.categories.length;

		return (
			<Disabled>
				{ hasCategories ? (
					<ServerSideRender
						block={ name }
						attributes={ attributes }
						EmptyResponsePlaceholder={ () => (
							<Placeholder
								icon="category"
								label={ __(
									'Products by Category EBC',
									'woocommerce'
								) }
								className="wc-block-products-grid wc-block-products-category"
							>
								{ __(
									'No products were found that matched your selection.',
									'woocommerce'
								) }
							</Placeholder>
						) }
					/>
				) : (
					__(
						'Select at least one category to display its products.',
						'woocommerce'
					)
				) }
			</Disabled>
		);
	}

	render() {
		const { isEditing } = this.state;
		const { attributes } = this.props;

		if ( attributes.isPreview ) {
			return gridBlockPreview;
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={ [
							{
								icon: 'edit',
								title: __( 'Edit' ),
								onClick: () =>
									isEditing
										? this.stopEditing()
										: this.startEditing(),
								isActive: isEditing,
							},
						] }
					/>
				</BlockControls>
				{ this.getInspectorControls() }
				{ isEditing ? this.renderEditMode() : this.renderViewMode() }
			</Fragment>
		);
	}
}

export default withSpokenMessages( ProductByCategoryBlockEBC );
