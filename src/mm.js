var mm = function (template) {
    var tree = mm.parse(template);

    var doc = document.createDocumentFragment();
    var style = document.createElement('style');

    if (tree.children) {
        tree.children.forEach(function (node) {
            if (node.type !== 'node') {
                throw new SyntaxError('Invalid node type ' + node.type + ' near ' + node.value)
            }
            switch (node.value) {
                case 'layout':
                    mm.layout(doc, node);
                    break;
                case 'style':
                    mm.style(style, node);
                    break;
                case 'content':
                    mm.content(doc, node);
                    break;
                default:
                    throw new SyntaxError('Invalid root node value ' + node.value + ' (only layout, style, and content may be root nodes)');
            }
        });
    }

    return {root: doc, style: style};
};

mm.layout = function (doc, node) {
    if (Array.isArray(node.children)) {
        node.children.forEach(function (child) {
            if (child.type === 'node') {
                var el = document.createElement('div');
                el.classList.add(child.value);
                doc.appendChild(el);
                mm.layout(el, child);
            }

            else {
                throw new SyntaxError('Invalid node type ' + child.type + ' near ' + child.value);
            }
        });
    }
};

mm.content = function (doc, node) {
    if (Array.isArray(node.children)) {
        node.children.forEach(function (child) {
            if (child.type === 'string') {
                var temp = document.createElement('template');
                temp.innerHTML = child.value;
                doc.appendChild(temp.content);
            }

            else {
                var els = Array.prototype.slice.apply(
                    doc.querySelectorAll('.' + child.value.replace('.', '\\.'))
                );
                els.forEach(function (el) {
                    mm.content(el, child);
                });
            }
        });
    }
};

mm.style = function (style, node) {
    ;
};

mm.parse = function (template) {
    var tree = {type: 'node', value: null, indent: -1};
    var node = tree;

    template.split('\n').forEach(function (line) {
        var indentMatch = line.match(/^\s*/);
        var valueMatch = line.match(/\S.*?\s*$/);
        var nodes = [];
        var indent, value;
        if (indentMatch && valueMatch) {
            indent = indentMatch[0].length;
            value = valueMatch[0];
            while (true) {
                var wordMatch = value.match(/^([^"'\s]+)\s*/);
                if (!wordMatch) {
                    break;
                }
                nodes.push({
                    type: 'node',
                    value: wordMatch[1]
                });
                var trim = wordMatch[0];
                value = value.substr(trim.length);
            }
            if (value.length) {
                nodes.push({
                    type: 'string',
                    value: value
                                .replace(/^\s*['"]/, '')
                                .replace(/['"]\s*$/, '')
                });
            }

            /**
             * Escape out of non-node types
             */
            while (node.type !== 'node') {
                node = node.getParent();
            }

            /**
             * Go back up the tree towards the root
             */
            while (node.indent > indent) {
                node = node.getParent();
                /**
                 * Verify that the indentation level is appropriate
                 */
                if (node.indent < indent) {
                    throw new SyntaxError("Indentation level does not match any previous level near: " + nodes[0].value);
                }
            }

            /**
             * Go up once more if we are at the sibling
             */
            if (node.indent === indent) {
                node = node.getParent();
            }

            /**
             * Add nodes to the tree
             */
            nodes.forEach(function (newNode) {
                newNode.indent = indent;
                var parent = node;
                newNode.getParent = function () {
                    return parent;
                };
                if (!Array.isArray(node.children)) {
                    node.children = [];
                };
                node.children.push(newNode);
                node = newNode;
            });
        }
    });

    return tree;
};
