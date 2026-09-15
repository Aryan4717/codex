class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.size();
        
        vector<vector<bool>> isPal(n, vector<bool>(n, false));
        
        for (int len = 1; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (len == 1) {
                    isPal[i][j] = true;
                } else if (len == 2) {
                    isPal[i][j] = (s[i] == s[j]);
                } else {
                    isPal[i][j] = (s[i] == s[j] && isPal[i + 1][j - 1]);
                }
            }
        }
        
        vector<int> dp(n + 1, 0);
        
        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            
            if (i + k - 1 < n && isPal[i][i + k - 1]) {
                dp[i] = max(dp[i], 1 + dp[i + k]);
            }
            
            if (i + k < n && isPal[i][i + k]) {
                dp[i] = max(dp[i], 1 + dp[i + k + 1]);
            }
        }
        
        return dp[0];
    }
};
