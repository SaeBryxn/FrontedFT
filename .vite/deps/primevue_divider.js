import {
  BaseStyle,
  script
} from "./chunk-SM4Z7LAT.js";
import "./chunk-TR6BEN7L.js";
import {
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-GY7FY3NU.js";
import "./chunk-G3PMV62Z.js";

// node_modules/primevue/divider/style/dividerstyle.esm.js
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      justifyContent: props.layout === "horizontal" ? props.align === "center" || props.align === null ? "center" : props.align === "left" ? "flex-start" : props.align === "right" ? "flex-end" : null : null,
      alignItems: props.layout === "vertical" ? props.align === "center" || props.align === null ? "center" : props.align === "top" ? "flex-start" : props.align === "bottom" ? "flex-end" : null : null
    };
  }
};
var classes = {
  root: function root2(_ref2) {
    var props = _ref2.props;
    return ["p-divider p-component", "p-divider-" + props.layout, "p-divider-" + props.type, {
      "p-divider-left": props.layout === "horizontal" && (!props.align || props.align === "left")
    }, {
      "p-divider-center": props.layout === "horizontal" && props.align === "center"
    }, {
      "p-divider-right": props.layout === "horizontal" && props.align === "right"
    }, {
      "p-divider-top": props.layout === "vertical" && props.align === "top"
    }, {
      "p-divider-center": props.layout === "vertical" && (!props.align || props.align === "center")
    }, {
      "p-divider-bottom": props.layout === "vertical" && props.align === "bottom"
    }];
  },
  content: "p-divider-content"
};
var DividerStyle = BaseStyle.extend({
  name: "divider",
  classes,
  inlineStyles
});

// node_modules/primevue/divider/divider.esm.js
var script$1 = {
  name: "BaseDivider",
  "extends": script,
  props: {
    align: {
      type: String,
      "default": null
    },
    layout: {
      type: String,
      "default": "horizontal"
    },
    type: {
      type: String,
      "default": "solid"
    }
  },
  style: DividerStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Divider",
  "extends": script$1,
  inheritAttrs: false
};
var _hoisted_1 = ["aria-orientation"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: _ctx.sx("root"),
    role: "separator",
    "aria-orientation": _ctx.layout
  }, _ctx.ptmi("root")), [_ctx.$slots["default"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("content")
  }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16)) : createCommentVNode("", true)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_divider.js.map
