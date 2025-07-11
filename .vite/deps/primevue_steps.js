import {
  BaseStyle,
  script
} from "./chunk-SM4Z7LAT.js";
import {
  DomHandler
} from "./chunk-TR6BEN7L.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderList,
  resolveDynamicComponent,
  toDisplayString
} from "./chunk-GY7FY3NU.js";
import "./chunk-G3PMV62Z.js";

// node_modules/primevue/steps/style/stepsstyle.esm.js
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-steps p-component", {
      "p-readonly": props.readonly
    }];
  },
  menu: "p-steps-list",
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance, item = _ref2.item, index = _ref2.index;
    return ["p-steps-item", {
      "p-highlight p-steps-current": instance.isActive(index),
      "p-disabled": instance.isItemDisabled(item, index)
    }];
  },
  action: "p-menuitem-link",
  step: "p-steps-number",
  label: "p-steps-title"
};
var StepsStyle = BaseStyle.extend({
  name: "steps",
  classes
});

// node_modules/primevue/steps/steps.esm.js
var script$1 = {
  name: "BaseSteps",
  "extends": script,
  props: {
    id: {
      type: String
    },
    model: {
      type: Array,
      "default": null
    },
    readonly: {
      type: Boolean,
      "default": true
    },
    activeStep: {
      type: Number,
      "default": 0
    }
  },
  style: StepsStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Steps",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:activeStep", "step-change"],
  data: function data() {
    return {
      d_activeStep: this.activeStep
    };
  },
  watch: {
    activeStep: function activeStep(newValue) {
      this.d_activeStep = newValue;
    }
  },
  mounted: function mounted() {
    var firstItem = this.findFirstItem();
    firstItem && (firstItem.tabIndex = "0");
  },
  methods: {
    getPTOptions: function getPTOptions(key, item, index) {
      return this.ptm(key, {
        context: {
          item,
          index,
          active: this.isActive(index),
          disabled: this.isItemDisabled(item, index)
        }
      });
    },
    onItemClick: function onItemClick(event, item, index) {
      if (this.disabled(item) || this.readonly) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item
        });
      }
      if (index !== this.d_activeStep) {
        this.d_activeStep = index;
        this.$emit("update:activeStep", this.d_activeStep);
      }
      this.$emit("step-change", {
        originalEvent: event,
        index
      });
    },
    onItemKeydown: function onItemKeydown(event, item) {
      switch (event.code) {
        case "ArrowRight": {
          this.navigateToNextItem(event.target);
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          this.navigateToPrevItem(event.target);
          event.preventDefault();
          break;
        }
        case "Home": {
          this.navigateToFirstItem(event.target);
          event.preventDefault();
          break;
        }
        case "End": {
          this.navigateToLastItem(event.target);
          event.preventDefault();
          break;
        }
        case "Tab":
          break;
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onItemClick(event, item);
          event.preventDefault();
          break;
        }
      }
    },
    navigateToNextItem: function navigateToNextItem(target) {
      var nextItem = this.findNextItem(target);
      nextItem && this.setFocusToMenuitem(target, nextItem);
    },
    navigateToPrevItem: function navigateToPrevItem(target) {
      var prevItem = this.findPrevItem(target);
      prevItem && this.setFocusToMenuitem(target, prevItem);
    },
    navigateToFirstItem: function navigateToFirstItem(target) {
      var firstItem = this.findFirstItem(target);
      firstItem && this.setFocusToMenuitem(target, firstItem);
    },
    navigateToLastItem: function navigateToLastItem(target) {
      var lastItem = this.findLastItem(target);
      lastItem && this.setFocusToMenuitem(target, lastItem);
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = DomHandler.findSingle(this.$refs.list, '[data-pc-section="menuitem"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = DomHandler.find(this.$refs.list, '[data-pc-section="menuitem"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    },
    setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = "-1";
      focusableItem.tabIndex = "0";
      focusableItem.focus();
    },
    isActive: function isActive(index) {
      return index === this.d_activeStep;
    },
    isItemDisabled: function isItemDisabled(item, index) {
      return this.disabled(item) || this.readonly && !this.isActive(index);
    },
    visible: function visible(item) {
      return typeof item.visible === "function" ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === "function" ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === "function" ? item.label() : item.label;
    },
    getMenuItemProps: function getMenuItemProps(item, index) {
      var _this = this;
      return {
        action: mergeProps({
          "class": this.cx("action"),
          onClick: function onClick($event) {
            return _this.onItemClick($event, item);
          },
          onKeyDown: function onKeyDown($event) {
            return _this.onItemKeydown($event, item);
          }
        }, this.getPTOptions("action", item, index)),
        step: mergeProps({
          "class": this.cx("step")
        }, this.getPTOptions("step", item, index)),
        label: mergeProps({
          "class": this.cx("label")
        }, this.getPTOptions("label", item, index))
      };
    }
  }
};
var _hoisted_1 = ["id"];
var _hoisted_2 = ["aria-current", "onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("nav", mergeProps({
    id: _ctx.id,
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [createBaseVNode("ol", mergeProps({
    ref: "list",
    "class": _ctx.cx("menu")
  }, _ctx.ptm("menu")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.label(item) + "_" + index.toString()
    }, [$options.visible(item) ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      "class": [_ctx.cx("menuitem", {
        item,
        index
      }), item["class"]],
      style: item.style,
      "aria-current": $options.isActive(index) ? "step" : void 0,
      onClick: function onClick($event) {
        return $options.onItemClick($event, item, index);
      },
      onKeydown: function onKeydown($event) {
        return $options.onItemKeydown($event, item, index);
      }
    }, $options.getPTOptions("menuitem", item, index), {
      "data-p-highlight": $options.isActive(index),
      "data-p-disabled": $options.isItemDisabled(item, index)
    }), [!_ctx.$slots.item ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": _ctx.cx("action")
    }, $options.getPTOptions("action", item, index)), [createBaseVNode("span", mergeProps({
      "class": _ctx.cx("step")
    }, $options.getPTOptions("step", item, index)), toDisplayString(index + 1), 17), createBaseVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, $options.getPTOptions("label", item, index)), toDisplayString($options.label(item)), 17)], 16)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item,
      index,
      active: index === $data.d_activeStep,
      label: $options.label(item),
      props: $options.getMenuItemProps(item, index)
    }, null, 8, ["item", "index", "active", "label", "props"]))], 16, _hoisted_2)) : createCommentVNode("", true)], 64);
  }), 128))], 16)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_steps.js.map
