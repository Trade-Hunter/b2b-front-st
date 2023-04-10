const updateNodes = (nodes: any) =>
  nodes.map((node: any) => {
    if (!node.nodes?.length) {
      return { ...node, expanded: false };
    }

    node.nodes = updateNodes(node.nodes);

    const everyChecked = node.nodes.every((item: any) => item.checked);
    const someChecked = node.nodes.some((item: any) => item.checked);
    const anyDeterminate = node.nodes.some((item: any) => item.indeterminate);

    node.checked = everyChecked;
    node.indeterminate = !everyChecked && (someChecked || anyDeterminate);

    return node;
  });

export default updateNodes;
