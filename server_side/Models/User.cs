using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WeezitServer.Models.DAL;

namespace WeezitServer.Models
{
    public class User: Person
    {
        public User(){ }

        public User(string name, int id, string image): base(id, name, image){ }

        public User(string token, int coins, int wins, DateTime lastTokenCheck, string name, int id, string image): base(id, name, image)
        {
            Token = token;
            Coins = coins;
            Wins = wins;
            LastTokenCheck = lastTokenCheck;
        }

        public User(string token, int id): base(id)
        {
            Token = token;
        }

        public string Token { get; set; }
        public int Coins { get; set; }
        public int Wins { get; set; }
        public DateTime LastTokenCheck { get; set; }
        static DBConnection db = new DBConnection();

        public override DataTable Get() //get user profile ---checked
        {
            //procedure GetProfile
            return db.GetProfile(Id);
        }

        public DataTable GetPlayer()// checked
        {
            //procedure GetPlayer
            return db.GetPlayer(Id, "GetPlayer");
        }
        public override int Insert() //insert new user --- checked
        {
            //PROCEDURE InsertUser
            return db.InsertUser(Token);
        }

        public void DeleteUserSearch(int searchId) //delete this user searche by userId AND searchId --- checked
        {
            //procedure DeleteUserSearch
            db.DeleteUserSearch(Id, searchId);
        }

        public void DeleteAllSearchs() //delete this user searches by his Id --- checked
        {
            //procedure DeleteAllUserSearch
            db.DeleteUserOrUserSearchs(Id, "DeleteAllUserSearch");
        }

        public void DeleteUser() //delete this user by his Id --- checked
        {
            //procedure DeleteUser
            db.DeleteUserOrUserSearchs(Id, "DeleteUser");
        }

        public DataTable UpdateWins(bool mode) //by result of user in game we update the num of coins and wins --- checked
        {
            if (mode)
            {
                //procedure WonInGame
                return db.GetPlayer(Id, "WonInGame");
            }
            //else --> PROCEDURE LostInGame
            return db.GetPlayer(Id, "LostInGame");
        }

        public void UpdateToken() //if the last time we check the token is NOT today than we update the token AND the LastTokenCheck for today  --- checked
        {
            //procedure UpdateToken
            db.UpdateToken(this);
        }

        public void UpdateProfile() //update new data of user --- checked
        {
            //procedure UpdateProfile
            db.UpdateProfile(this);
        }

        public void InsertUserSearch(Search search) //insert new search of user --- checked
        {
            if (search.Insert() != -1)
            {
                //procedure InsertUserSearch
                db.InsertUserSearch(Id, search.Id);
            }
        }

        public DataTable GetAllSearches() //get all searches that user search --- checked
        {
            //procedure AllUserSearchs
            return db.GetUserSearchsTbl(Id);
        }

        public int GetCoins() //get total user coins --- checked //maybe not necessary???
        {
            //procedure GetCoins
            return db.GetCoins(Id);
        }

        public int GetWins() //get total user wins --- checked //maybe not necessary???
        {
            //procedure UserWins
            return db.TotalUserWins(Id);
        }

        public DataTable GetLeaders()// --- checked
        {
            return db.GetLeadersTbl();
        }
    }
}