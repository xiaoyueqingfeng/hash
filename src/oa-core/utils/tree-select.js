const walkTree = (tree, fn, parentNode) => {
  tree.forEach(node => {
    fn(node, parentNode)
    if (node.children && node.children.length) {
      walkTree(node.children, fn, node)
    }
  })
}
export class TreeNode {
  constructor({ id, name } = {}) {
    this.id = id
    this.name = name
    this.parentNode = null
    this.checked = false
    this.indeterminate = false
    /**
     * @type {Array<TreeNode>}
     */
    this.children = []
  }
  append(treeNode) {
    if (!this.children) {
      this.children = []
    }
    this.children.push(treeNode)
    return this
  }
  /**
   * @param {TreeNode} parentNode
   */
  appendTo(parentNode) {
    this.parentNode = parentNode
    if (this.parentNode.children.indexOf(this) === -1) {
      this.parentNode.children.push(this)
    }
    return this
  }
  pushTo(arr = []) {
    arr.push(this)
    return this
  }
  attr(attrs = {}) {
    for (let k in attrs) {
      this[k] = attrs[k]
    }
    return this
  }
  getChildIds() {
    return this.children.map(node => node.id)
  }
  getDescendantNodes() {
    const _nodes = []
    /**
     * @param {TreeNode} treeNode
     */
    const walk = treeNode => {
      treeNode.children.forEach(childNode => {
        _nodes.push(childNode)
        if (childNode.children.length) {
          walk(childNode)
        }
      })
    }
    walk(this)
    return _nodes
  }
  getDescendantIds() {
    return this.getDescendantNodes().map(node => node.id)
  }
  getPathNodes() {
    const _pathNodes = [this]
    let curr = this
    while (curr.parentNode) {
      _pathNodes.unshift(curr.parentNode)
      curr = curr.parentNode
    }
    return _pathNodes
  }
  getPathIds() {
    return this.getPathNodes().map(node => node.id)
  }
  getFamilyIds() {
    return this.getPathIds().concat(this.getDescendantIds())
  }
  isChecked() {
    if (this.isLeaf()) {
      return this.checked
    } else {
      return this.children.some(node => node.isChecked())
    }
  }

  calcInitChecked(checkedIds = []) {
    if (this.isLeaf()) {
      return checkedIds.indexOf(this.id) > -1
    } else {
      return this.children.some(node => node.calcInitChecked(checkedIds))
    }
  }
  isIndeterminate() {
    if (this.isLeaf()) {
      return false
    } else {
      const descNodes = this.getDescendantNodes()
      const descCheckedCount = descNodes.filter(node => node.checked).length
      return descCheckedCount > 0 && descCheckedCount < descNodes.length
    }
  }
  isLeaf() {
    return this.children.length === 0
  }
  /**
   * 处理节点变化
   * @param {boolean} checked 该节点是否选中
   */
  handleChange(checked) {
    const descNodes = this.getDescendantNodes()
    this.checked = checked
    this.indeterminate = false
    // 子代节点都为相关状态
    descNodes.forEach(node => {
      node.checked = checked
      node.indeterminate = false
    })
    let par = this.parentNode
    while (par) {
      par.checked = par.isChecked()
      par.indeterminate = par.isIndeterminate()
      par = par.parentNode
    }
    return this
  }
}

export const LEAF_ONLY = 1
export const LEAF_AND_PARENT = 2

export class TreeSelect {
  constructor(
    treeOptions = [],
    { mode = LEAF_AND_PARENT, dropUnsed = true } = {}
  ) {
    this._treeOptions = treeOptions
    this._mode = mode
    this.tree = []
    this._checkedIds = []
    this._dropUnsed = dropUnsed
    this._initTree()
  }
  _initTree() {
    /**
     * @type {Array<TreeNode>}
     */
    const _tree = []
    walkTree(this._treeOptions, (node, parentNode) => {
      if (!parentNode) {
        node.__treeNode = new TreeNode()
          .attr({
            id: node.id,
            name: node.name,
            _origin: node
          })
          .pushTo(_tree)
      } else {
        node.__treeNode = new TreeNode()
          .attr({
            id: node.id,
            name: node.name,
            _origin: node
          })
          .appendTo(parentNode.__treeNode)
      }
    })
    this.tree = _tree
  }
  /**
   * 设定初始化数选项
   * @param {Array<{id,name,children}>} tree 初始化数选项
   * @return {this}
   */
  setTreeOptions(treeOptions = []) {
    this._treeOptions = treeOptions
    this._initTree()
    return this
  }
  /**
   * 设定初始化选中的模型值
   * @param {Array<Number|String>} checkedIds 模型值 id数组
   */
  setCheckedIds(checkedIds = []) {
    this._checkedIds = checkedIds
    walkTree(this.tree, node => {
      node.checked = node.calcInitChecked(checkedIds)
    })
    walkTree(this.tree, node => {
      node.indeterminate = node.isIndeterminate()
    })
    return this
  }
  calcCheckedIds() {
    const ids = []
    if (this._mode === LEAF_AND_PARENT) {
      walkTree(this.tree, node => {
        node.checked && ids.push(node.id)
      })
    }
    if (this._mode === LEAF_ONLY) {
      walkTree(this.tree, node => {
        node.isLeaf() && node.checked && ids.push(node.id)
      })
    }
    // just return ids that in real data
    if (this._dropUnsed) {
      return ids
    } else {
      return [...new Set(this._checkedIds.concat(ids))]
    }
  }
}
