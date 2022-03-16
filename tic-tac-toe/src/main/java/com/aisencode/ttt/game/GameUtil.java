package com.aisencode.ttt.game;

import java.util.List;

public class GameUtil {

    /**
     * Returns the winner of the game
     *
     * @return winner
     */
    public static String checkWinner(List<String> grid) {
        String winner = " ";
        if (grid.get(0).equals(grid.get(1)) && grid.get(1).equals(grid.get(2)) && !grid.get(0).equals(" "))
            winner = grid.get(0);
        else if (grid.get(3).equals(grid.get(4)) && grid.get(4).equals(grid.get(5)) && !grid.get(3).equals(" "))
            winner = grid.get(3);
        else if (grid.get(6).equals(grid.get(7)) && grid.get(7).equals(grid.get(8)) && !grid.get(6).equals(" "))
            winner = grid.get(6);
            // VERTICAL
        else if (grid.get(0).equals(grid.get(3)) && grid.get(3).equals(grid.get(6)) && !grid.get(0).equals(" "))
            winner = grid.get(0);
        else if (grid.get(1).equals(grid.get(4)) && grid.get(4).equals(grid.get(7)) && !grid.get(1).equals(" "))
            winner = grid.get(1);
        else if (grid.get(2).equals(grid.get(5)) && grid.get(5).equals(grid.get(8)) && !grid.get(2).equals(" "))
            winner = grid.get(2);
            // DIAGONAL
        else if (grid.get(0).equals(grid.get(4)) && grid.get(4).equals(grid.get(8)) && !grid.get(0).equals(" "))
            winner = grid.get(0);
        else if (grid.get(2).equals(grid.get(4)) && grid.get(4).equals(grid.get(6)) && !grid.get(2).equals(" "))
            winner = grid.get(2);
        return winner;
    }

    /**
     * Check if there is an empty space in the grid
     *
     * @return true = FULL  false = SPACE LEFT
     */
    public static Boolean isGridFull(List<String> grid) {
        for (String s : grid) {
            if (s.equals(" "))
                return false;
        }
        return true;
    }

}
