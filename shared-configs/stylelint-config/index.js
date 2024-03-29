module.exports = {
  extends: [
    'stylelint-config-standard-scss', // configure for SCSS
    'stylelint-config-recommended-vue/scss', // add overrides for .Vue files
    'stylelint-config-recess-order', // use the recess order for properties
    'stylelint-config-css-modules' // configure for CSS Modules methodology
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'color-hex-length': null,
    'custom-property-empty-line-before': null,
    'selector-class-pattern': null,
    'value-keyword-case': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-no-unknown': null,
    'scss/function-no-unknown': true,
    'scss/dollar-variable-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/selector-no-redundant-nesting-selector': true
  }
}
