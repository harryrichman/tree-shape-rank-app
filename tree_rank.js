
function rankToTree(r) {
    /*
    Args:
        r: int
    */
    const root_node = {
        id: "" + r,
        label: "" + r,
    };
    var tree = { nodes: [root_node], edges: [] };
    if (r == 0) {
        return tree;
    }
    var to_process = [{label: "" + r, prefix: ""}];
    while (to_process.length > 0) {
        const p_obj = to_process.pop();
        const p_id = p_obj.label;
        const p_prefix = p_obj.prefix;
        const p_parts = p_id.split("-");
        const p = parseInt(p_parts[p_parts.length - 1]);
        // const p_prefix = p_lab.split("-").slice(-1).join();
        // debugging
        // console.log("p_lab: " + p_obj.label);
        // console.log("p: " + p);
        // console.log("p_prefix: " + p_prefix);
        c1 = largerChild(p);
        c2 = smallerChild(p);
        const children = [c1, c2];
        const LR = ["L", "R"]
        for (let i = 0; i < 2; i++) {
            c = children[i];
            const dir = LR[i];
            const c_id = p_prefix + dir + "-" + c;
            const node_c = {
                id: c_id,
                // label: p_prefix + dir + "-" + c,
                label: "" + c,
            }
            tree.nodes.push(node_c);
            const edge_c = {
                from: p_id,
                to: c_id,
            }
            tree.edges.push(edge_c);
            if (c > 0) {
                to_process.push({label: c_id, prefix: p_prefix + dir});
            }
        }
    }
    return tree;
}

function largerChild(r) {
    return childRankSum(r) - smallerChild(r);
    //
}

function smallerChild(r) {
    s = childRankSum(r);
    return r - Math.floor((s + 1) ** 2 / 4) - 1
    //
}

function childRankSum(r) {
    return Math.floor(Math.sqrt(4 * r - 3)) - 1
}

function combineFromChildren(a, b) {
    if (a < b) {
        return combineFromChildren(b, a)
    }
    return Math.floor((a + b + 1) / 2) * Math.ceil((a + b + 1) / 2) + b + 1
}