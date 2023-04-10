function getNodeById(nodes: any, id: any) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.id === id) return node;

    if (Array.isArray(node.nodes)) {
      const currentNode: any = getNodeById(node.nodes, id);

      if (currentNode) return currentNode;
    }
  }
}

export default getNodeById;
