class Solution {
public:
    int ans = 0;

    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};

        auto [lsum, lcnt] = dfs(node->left);
        auto [rsum, rcnt] = dfs(node->right);

        int sum = lsum + rsum + node->val;
        int cnt = lcnt + rcnt + 1;

        if (sum / cnt == node->val) ans++;

        return {sum, cnt};
    }

    int averageOfSubtree(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
