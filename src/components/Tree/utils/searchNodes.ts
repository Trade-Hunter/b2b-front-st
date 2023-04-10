const searchNodes = (nodes: any, searchText: any) => {
  const getNodes = (result: any, node: any) => {
    const isMatched = node.label
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (isMatched) {
      result.push(node);
      return result;
    }

    if (Array.isArray(node.nodes)) {
      const nodes = node.nodes.reduce(getNodes, []);
      if (nodes.length) result.push({ ...node, nodes });
    }

    return result;
  };

  return nodes.reduce(getNodes, []);
};

export default searchNodes;
