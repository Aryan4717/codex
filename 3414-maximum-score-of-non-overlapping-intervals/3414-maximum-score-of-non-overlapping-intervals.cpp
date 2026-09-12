class Solution {
public:
    struct Node {
        long long score;
        vector<int> picks;
        Node(long long s = LLONG_MIN) : score(s) {}
        Node(long long s, vector<int> p) : score(s), picks(std::move(p)) {}
    };

    static bool lexSmaller(const vector<int>& a, const vector<int>& b) {
        return a < b;
    }

    static Node better(const Node& a, const Node& b) {
        if (a.score != b.score) return (a.score > b.score ? a : b);
        if (a.score == LLONG_MIN) return a;
        return lexSmaller(a.picks, b.picks) ? a : b;
    }

    vector<int> maximumWeight(vector<vector<int>>& intervals) {
        int n = intervals.size();

        struct Interval {
            int l, r, w, idx;
        };

        vector<Interval> arr;
        for (int i = 0; i < n; i++) {
            arr.push_back({intervals[i][0], intervals[i][1], intervals[i][2], i});
        }

        sort(arr.begin(), arr.end(), [](const Interval& a, const Interval& b) {
            if (a.r != b.r) return a.r < b.r;
            if (a.l != b.l) return a.l < b.l;
            return a.idx < b.idx;
        });

        vector<int> ends(n + 1, 0);
        for (int i = 1; i <= n; i++) ends[i] = arr[i - 1].r;

        vector<int> prev(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int l = arr[i - 1].l;
            int j = lower_bound(ends.begin() + 1, ends.begin() + i, l) - ends.begin();
            prev[i] = j - 1; // last end < l
        }

        vector<vector<Node>> dp(n + 1, vector<Node>(5));
        for (int i = 0; i <= n; i++) {
            dp[i][0] = Node(0, {});
        }

        for (int i = 1; i <= n; i++) {
            for (int k = 0; k <= 4; k++) {
                dp[i][k] = dp[i - 1][k]; // skip
                if (k > 0 && dp[prev[i]][k - 1].score != LLONG_MIN) {
                    Node take = dp[prev[i]][k - 1];
                    take.score += arr[i - 1].w;
                    take.picks.push_back(arr[i - 1].idx);
                    sort(take.picks.begin(), take.picks.end());
                    dp[i][k] = better(dp[i][k], take);
                }
            }
        }

        Node ans(0, {});
        for (int k = 0; k <= 4; k++) {
            ans = better(ans, dp[n][k]);
        }
        return ans.picks;
    }
};
