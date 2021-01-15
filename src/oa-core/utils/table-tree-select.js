import { isNil, get, union, intersection } from 'lodash-es'

export class TableTreeSelect {
  constructor(
    tree = [],
    {
      parentField = 'parent_id',
      childrenField = 'children',
      idField = 'id',
      nameField = 'name'
    } = {}
  ) {
    this.tree = tree
    this.parentField = parentField
    this.childrenField = childrenField
    this.idField = idField
    this.nameField = nameField
  }
  getId(node) {
    return get(node, this.idField)
  }
  getParentId(node) {
    return get(node, this.parentField)
  }
  getChildren(node) {
    return get(node, this.childrenField)
  }
  getName(node) {
    return get(node, this.nameField)
  }
  setTree(tree = []) {
    this.tree = tree
  }
  getTree() {
    return this.tree
  }
  walkTree(tree = [], fn) {
    const walk = (nodes, depth = 0) => {
      if (Array.isArray(nodes)) {
        nodes.forEach(node => {
          const children = this.getChildren(node)
          const hasChildren = children && children.length
          fn && fn(node, depth)
          if (hasChildren) {
            walk(children, depth + 1)
          }
        })
      }
    }
    walk(tree)
  }
  /**
   * 通过树 获取所有后代节点id
   */
  getDescendantIdsByTree(tree) {
    const _ids = []
    this.walkTree(tree, node => {
      _ids.push(this.getId(node))
    })
    /**
     * id去重
     */
    return union(_ids)
  }
  walk(fn) {
    this.walkTree(this.tree, fn)
  }
  getDescendantIds() {
    return this.getDescendantIdsByTree(this.tree)
  }
  /**
   * 通过tree树结构寻找该id所属于的 节点路径数组
   * @param {Array<object>} 树
   * @param { string | number } id 要寻找的值id
   */
  findPathNodesByTree(tree = [], id) {
    if (isNil(id)) {
      return []
    }
    let _paths = []
    let _finded = false

    this.walkTree(tree, (node, depth) => {
      const _nodeId = this.getId(node)
      // 遍历查找路径节点
      if (!_finded) {
        // 没找到
        if (depth === 0) {
          // 深度为0,重置paths数组
          _paths = [node]
        }
        // 否则添加节点到paths数组中
        _paths[depth] = node
      }
      // 如果当前节点等于点击的节点,跳出循环
      if (_nodeId === id) {
        if (_paths.length === depth + 1) {
          _finded = true
        } else {
          if (!node.children) {
            _paths.pop()
          } else {
            _paths[depth + 1] = node.children[0]
          }
          _finded = true
        }
      }
    })
    if (!_finded) {
      return []
    }
    return _paths
  }
  /**
   * 通过tree树结构寻找该id所属于的id路径数组
   * @param {Array<object>} 树
   * @param { string | number } id 要寻找的值id
   */
  findPathByTree(tree = [], id) {
    const pathNodes = this.findPathNodesByTree(tree, id)
    return pathNodes.map(node => this.getId(node))
  }
  findPathNodes(id) {
    return this.findPathNodesByTree(this.tree, id)
  }
  findPath(id) {
    return this.findPathByTree(this.tree, id)
  }
  findFamilyIdsIfShouldCheck(familyIds, model) {
    let ids = []
    let len = familyIds.length - 1
    for (let i = len; i >= 0; i--) {
      let id = familyIds[i]
      let result = this.checkNodeIfShouldCheck(this.tree, model, id, ids)
      if (result) ids.push(id)
    }
    return ids
  }
  checkNodeIfShouldCheck(nodes, model, id, ids) {
    let result = false
    if (!nodes || !Array.isArray(nodes)) return result
    for (let x = 0; x < nodes.length; x++) {
      let node = nodes[x]
      let _id = this.getId(node)
      if (_id !== id) {
        if (node.children && node.children.length) {
          result = this.checkNodeIfShouldCheck(node.children, model, id, ids)
        }
      } else {
        // 不存在子节点,删除该节点
        if (!node.children) {
          result = true
        } else {
          // 存在子节点[中间节点或顶级节点]
          // 子节点没有被选中，则删除该节点
          let childIds = node.children
            .map(child => child.id)
            .filter(i => !ids.includes(i))
          if (!intersection(model, childIds).length) {
            result = true
          }
        }
      }
      if (result) {
        break
      }
    }
    return result
  }
  /**
   * 计算是选中的节点ids (如果子节点有一个选中 父节点也选中)
   * @param {Array<string>} model 原选中模型数组
   * @param {object} node 选中的复选框节点
   * @param {boolean} checked 该是否选中
   * @return {Array<string>}
   */
  calcCheckedIds(model = [], node, checked) {
    const _nodeId = this.getId(node)
    const _nodeChildren = this.getChildren(node)
    /**
     * 路径ids
     */
    const pathIds = this.findPath(_nodeId)

    /**
     * 所有的子代ids
     */
    const descendantIds = this.getDescendantIdsByTree(_nodeChildren)
    /**
     * 父级id 自己id 孩子id 的集合
     */
    const familyIds = union(pathIds, [_nodeId], descendantIds)
    let newModelIds = []
    /**
     * 根据节点的顺序路径 选中 与 取消
     */
    if (checked) {
      // 设定选中的值
      newModelIds = union(model.concat(familyIds))
    } else {
      // 这里会在去除第三级节点时导致一级父节点丢失
      // 应该在此处针对该节点找寻其子节点
      // 当该节点不存在子节点，且该节点存在兄弟节点，且该节点的兄弟节点被选中时，仅删除该节点本身
      let _familyIds = this.findFamilyIdsIfShouldCheck(familyIds, model)
      newModelIds = model.filter(i => _familyIds.indexOf(i) === -1)
      // if (!node.children) {
      //   newModelIds = model.filter(i => i !== node.id)
      // } else {
      //   // 去除选中的节点和子节点,当且仅当层级小于等于3级时结果正确
      //   newModelIds = model.filter(i => familyIds.indexOf(i) === -1)
      // }
    }

    /**
     *  对于孩子有孩子节点 并且选中的节点 其父节点也是选中状态
     */
    const _parentShouldCheckedIds = []

    // this.walk(node => {
    //   const _children = this.getChildren(node)
    //   const _id = this.getId(node)
    //   if (_children && _children.length) {
    //     const childIds = _children.map(childNode => this.getId(childNode))
    //     if (intersection(newModelIds, childIds).length) {
    //       _parentShouldCheckedIds.push(_id)
    //     }
    //   }
    // })
    newModelIds = union(newModelIds, _parentShouldCheckedIds)
    return newModelIds
  }
  hasIndeterminate(parentNode, model = []) {
    const _children = this.getChildren(parentNode)
    const desIds = this.getDescendantIdsByTree(_children)
    const desCheckedIds = intersection(model, desIds)
    return desCheckedIds.length > 0 && desCheckedIds.length < desIds.length
  }
  /**
   * 通过id获取该节点的路径name名称
   * @param {string|number} id 需要获取路径的节点id
   * @param {string} joiner 连接符
   * @return {string} '品牌 - 菜单1 - 菜单1-2 - 菜单3'
   *
   */
  getPathName(id, joiner = '-') {
    return this.findPathNodes(id)
      .map(node => this.getName(node))
      .join(joiner)
  }
  /**
   * 获取一组id的路径name信息
   * @param {Array<string|number>} 需要获取路径ids
   * @param {string} joiner 连接符
   * @return ['品牌 - 菜单1 - 菜单1-2 - 菜单3','品牌 - 菜单1 - 菜单1-2 - 菜单4']
   */
  getPathNameGroup(ids, joiner = '-') {
    return ids.map(id => this.getPathName(id, joiner))
  }
}
