class Solution {
public:
    int minSumOfLengths(vector<int>& arr, int target) {
        int n = arr.size();
        const int INF = 1e9;
        
        vector<int> best(n, INF);
        int left = 0, sum = 0;
        int ans = INF;
        
        for (int right = 0; right < n; right++) {
            sum += arr[right];
            
            while (sum > target) {
                sum -= arr[left++];
            }
            
            int currLen = INF;
            
            if (sum == target) {
                currLen = right - left + 1;
                
                // Previous subarray must end before current starts
                if (left > 0 && best[left - 1] != INF) {
                    ans = min(ans, currLen + best[left - 1]);
                }
                
                // Move forward to search for another valid window
                sum -= arr[left++];
            }
            
            best[right] = currLen;
            if (right > 0) {
                best[right] = min(best[right], best[right - 1]);
            }
        }
        
        return ans == INF ? -1 : ans;
    }
};
