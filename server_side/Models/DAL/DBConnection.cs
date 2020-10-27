using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WeezitServer.Models.DAL
{
    public class DBConnection
    {
        string strCon = @"Data Source=Media.ruppin.ac.il;Initial Catalog = bgroup8_prod; User ID = bgroup8; Password=bgroup8_16183";

        SqlConnection con;
        SqlCommand cmd;
        SqlCommandBuilder builder;
        SqlDataAdapter adapter;
        SqlDataReader reader;
        SqlParameter rowCount;
        SqlParameter coins;

        DataTable dt;
        DataSet ds;
        
        public DBConnection(){ }

        private SqlConnection Connect()
        {
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            return con;
        }

        public int InsertUser(string token) //PROCEDURE InsertUser --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("InsertUser", con) { CommandType = CommandType.StoredProcedure };
                SqlParameter parameter = new SqlParameter("@Token", token);
                cmd.Parameters.Add(parameter);
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        private DataTable MostPopularSearch() // --- checked
        {
            //string strCmd = "select top 1 with ties SearchID, COUNT(UserID) as Count from UserSearch_tbl_2020 group by SearchID order by SearchID";
            string strCmd = "select S.Name, US.Count from Search_tbl_2020 S inner join (select top 1 with ties SearchID, COUNT(UserID) as Count from UserSearch_tbl_2020 group by SearchID order by SearchID desc) US on S.ID = US.SearchID";
            try
            {
                con = Connect();
                cmd = new SqlCommand(strCmd, con);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private DataTable GetDidYouKnowData() // --- checked
        {
            string strCmd = "select * from DidYouKnow_tbl2020";
            try
            {
                con = Connect();
                cmd = new SqlCommand(strCmd, con);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Question> GetQuestions() // --- checked
        {
            List<Question> questionList = new List<Question>();
            string strCmd = "select * from pic_question";
            try
            {
                con = Connect();
                cmd = new SqlCommand(strCmd, con);
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Question q = new Question((int)reader["id"], (string)reader["img"], (string)reader["correct_answer"], new string[3] { (string)reader["ans2"], (string)reader["ans3"], (string)reader["ans4"] });
                    questionList.Add(q);
                }

                return questionList;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                con.Close();
            }
        }

        public DataSet GetFactsData() // --- checked
        {
            try
            {
                ds = new DataSet();
                //1. most popular
                DataTable dt1 = MostPopularSearch();            
                ds.Tables.Add(dt1);
                //2. did you know tbl
                DataTable dt2 = GetDidYouKnowData();
                ds.Tables.Add(dt2);

                return ds;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable GetUserSearchsTbl(int userId) //procedure AllUserSearchs --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("AllUserSearchs", con) { CommandType = CommandType.StoredProcedure };
                SqlParameter parameter = new SqlParameter("@UserId", userId);
                cmd.Parameters.Add(parameter);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable GetSearch(int searchId)//procedure GetSearch --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("GetSearch", con) { CommandType = CommandType.StoredProcedure };
                SqlParameter parameter = new SqlParameter("@SearchId", searchId);
                cmd.Parameters.Add(parameter);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable GetProfile(int userId) //procedure GetProfile --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("GetProfile", con) { CommandType = CommandType.StoredProcedure };
                SqlParameter parameter = new SqlParameter("@UserId", userId);
                cmd.Parameters.Add(parameter);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }       

        public DataTable GetPlayer(int userId, string procedureName) //procedure GetPlayer --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand(procedureName, con) { CommandType = CommandType.StoredProcedure };
                SqlParameter parameter = new SqlParameter("@UserId", userId);
                cmd.Parameters.Add(parameter);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private DataTable FillDataSource(SqlCommand command)// --- checked
        {
            try
            {
                DataTable dt = new DataTable();
                adapter = new SqlDataAdapter(command);
                adapter.Fill(dt);
                return dt;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int UpdateProfile(User user) //procedure UpdateProfile --- checked
        {
            try
            {
                con = Connect();
                cmd = CreateUserChangesCmd("UpdateProfile", user.Id);
                cmd.Parameters.Add(new SqlParameter("@Username", user.Name));
                cmd.Parameters.Add(new SqlParameter("@Image", user.Image));
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(rowCount.Value);
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }



        public int UpdateToken(User user) //procedure UpdateToken --- checked
        {
            try
            {
                con = Connect();
                cmd = CreateUserChangesCmd("UpdateToken", user.Id);
                cmd.Parameters.Add(new SqlParameter("@Token", user.Token));               
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(rowCount.Value);
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        public int InsertUserSearch(int userId, int searchId)//procedure InsertUserSearch --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("InsertUserSearch", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@SearchId", searchId));
                cmd.Parameters.Add(new SqlParameter("@UserId", userId));
                return cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        public int InsertSearch(Search search)//procedure InsertSearch --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("InsertSearch", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@SearchId", search.Id));
                cmd.Parameters.Add(new SqlParameter("@Image", search.Image));
                cmd.Parameters.Add(new SqlParameter("@Name", search.Name));
                cmd.Parameters.Add(new SqlParameter("@Biography", search.Biography));
                SqlParameter param = new SqlParameter("@Res", SqlDbType.Int);
                param.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(param);
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(param.Value);
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        public int TotalUserWins(int userId) //procedure UserWins -- checked
        {
            try
            {
                con = Connect();
                SqlCommand cmd = new SqlCommand("UserWins", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@UserId", userId));
                SqlParameter winsParam = new SqlParameter("@Wins", SqlDbType.Int);
                winsParam.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(winsParam);
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(winsParam.Value);
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        public DataTable GetLeadersTbl() //the top 4 --- checked
        {
            string strCmd = @"select TOP 4 WITH TIES Wins, UserName, ID from User_2020 where Wins <> 0 order by Wins desc";
            try
            {
                con = Connect();
                cmd = new SqlCommand(strCmd, con);
                return FillDataSource(cmd);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private SqlCommand CreateCoinsCmd(string procedureName, int userId) // --- checked
        {
            SqlCommand cmd = new SqlCommand(procedureName, con) { CommandType = CommandType.StoredProcedure };
            cmd.CommandTimeout = 15;
            cmd.Parameters.Add(new SqlParameter("@UserId", userId));
            coins = new SqlParameter("@UserCoins", SqlDbType.Int);
            coins.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(coins);
            return cmd;
        }

        public int GetCoins(int userId)//procedure GetCoins --- checked
        {
            try
            {
                con = Connect();
                cmd = CreateCoinsCmd("GetCoins", userId);
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(coins.Value);
            }
            catch (Exception e)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
        }

        public void DeleteUserSearch(int userId, int searchId) // procedure DeleteUserSearch --- checked
        {
            try
            {
                con = Connect();
                cmd = new SqlCommand("DeleteUserSearch", con) { CommandType = CommandType.StoredProcedure };
                cmd.CommandTimeout = 15;
                //cmd = CreateUserChangesCmd("DeleteUserSearch", userId);
                cmd.Parameters.Add(new SqlParameter("@UserId", userId));
                cmd.Parameters.Add(new SqlParameter("@searchId", searchId));
                cmd.ExecuteNonQuery();
                //return Convert.ToInt32(rowCount.Value);
            }
            catch (Exception e)
            {
                //return -1;
                throw e;
            }
            finally
            {
                con.Close();
            }
        }

        public int DeleteUserOrUserSearchs(int userId, string procedureName) // --- checked
        {
            try
            {
                con = Connect();
                cmd = CreateUserChangesCmd(procedureName, userId);
                cmd.ExecuteNonQuery();
                return Convert.ToInt32(rowCount.Value);
            }
            catch (Exception e)
            {
                return-1;
            }
            finally
            {
                con.Close();
            }
        }

        private SqlCommand CreateUserChangesCmd(string procedureName, int userId)//this is for delete user and delete all user searches --- checked
        {
            SqlCommand cmd = new SqlCommand(procedureName, con) { CommandType = CommandType.StoredProcedure };
            cmd.CommandTimeout = 15;
            cmd.Parameters.Add(new SqlParameter("@UserId", userId));
            rowCount = new SqlParameter("@UpdateCount", SqlDbType.Int);
            rowCount.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(rowCount);
            return cmd;
        }
    }
}
