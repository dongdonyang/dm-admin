// 异步组件
export default {
  name: "RenderCell",
  functional: true, // 无状态
  props: {
    render: Function,
    item: {}
  },
  render: (h, context) => {
    console.log(context);
    return context.props.render(h, context.props.item);
  }
};
