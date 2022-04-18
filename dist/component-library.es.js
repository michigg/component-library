import { openBlock, createElementBlock, renderSlot, normalizeProps, guardReactiveProps, toDisplayString, normalizeClass } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$3 = {
  name: "Badge"
};
const _hoisted_1$1 = { class: "flex justify-center items-center shadow-md p-2 rounded-full" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var ButtonBase_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {};
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("button", normalizeProps(guardReactiveProps(_ctx.$attrs)), [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 16);
}
var ButtonBase = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-13c43ccd"]]);
const _sfc_main$1 = {
  name: "Headline",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
const _hoisted_1 = {
  class: "text-3xl",
  "data-test": "headline"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("h1", _hoisted_1, toDisplayString($props.title), 1);
}
var Headline = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "Icon",
  props: {
    iconKey: {
      type: String,
      required: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass(["bi", $props.iconKey]),
    "aria-hidden": true,
    "data-test": "icon"
  }, null, 2);
}
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var main = { Badge, ButtonBase, Headline, Icon };
export { main as default };
