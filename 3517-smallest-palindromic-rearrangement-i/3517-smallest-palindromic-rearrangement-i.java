class Solution {
    public String smallestPalindrome(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        StringBuilder half = new StringBuilder();
        String mid = "";

        for (int i = 0; i < 26; i++) {
            if ((freq[i] & 1) == 1) {
                mid = String.valueOf((char) ('a' + i));
            }
            for (int j = 0; j < freq[i] / 2; j++) {
                half.append((char) ('a' + i));
            }
        }

        String firstHalf = half.toString();
        String secondHalf = half.reverse().toString();

        return firstHalf + mid + secondHalf;
    }
}
