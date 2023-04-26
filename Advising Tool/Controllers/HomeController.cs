using Advising_Tool.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Diagnostics;
using System.Text.Json;

namespace Advising_Tool.Controllers
{
    public class HomeController : Controller
    {
        [Route("/Add-UGSheet-Redirect")]
        public IActionResult AddUndergraduateSheetRedirect(UndergraduateSchedule schedule)
        {
            Console.WriteLine(schedule.COURSES);
            using MySqlConnection conn = new(Utils.ConnectionString);
            conn.Open();
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO ugareas (AREA, DEGREE, COURSES, FINAL, ELECTIVE, NOTES, LONGNAME) VALUES (?AREA, ?DEGREE, ?COURSES, ?FINAL, ?ELECTIVE, ?NOTES, ?LONGNAME)";
            comm.Connection = conn;
            comm.Parameters.AddWithValue("?AREA", (schedule.AREA == "") ? null : schedule.AREA);
            comm.Parameters.AddWithValue("?DEGREE", (schedule.DEGREE == "") ? null : schedule.DEGREE);
            comm.Parameters.AddWithValue("?COURSES", (schedule.COURSES == "") ? "" : schedule.COURSES);
            comm.Parameters.AddWithValue("?FINAL", (schedule.FINAL == "") ? "" : schedule.FINAL);
            comm.Parameters.AddWithValue("?ELECTIVE", (schedule.ELECTIVE == "") ? "" : schedule.ELECTIVE);
            comm.Parameters.AddWithValue("?NOTES", (schedule.NOTES == "") ? "" : schedule.NOTES);
            comm.Parameters.AddWithValue("?LONGNAME", (schedule.LONGNAME == "") ? "" : schedule.LONGNAME);
            comm.Connection = conn;
            try
            {
                comm.ExecuteNonQuery();
            }
            catch (MySqlException err)
            {
                Console.WriteLine(err.ToString());
                throw err;
            }
            conn.Dispose();
            conn.Close();
            return View();
        }
        [Route("/Add-Sheet-Redirect")]
        public IActionResult AddGraduateSheetRedirect(GraduateSchedule schedule)
        {
            Console.WriteLine(schedule.COURSES);
            using MySqlConnection conn = new(Utils.ConnectionString);
            conn.Open();
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO areas (AREA, DEGREE, COURSES, FINAL, ELECTIVE, DEPTH, NOTES, LONGNAME, FOCUSELECT, SPECIALTY) VALUES (?AREA, ?DEGREE, ?COURSES, ?FINAL, ?ELECTIVE, ?DEPTH, ?NOTES, ?LONGNAME, ?FOCUS, ?SPECIALTY)";
            comm.Connection = conn;
            comm.Parameters.AddWithValue("?AREA", (schedule.AREA == "") ? null : schedule.AREA);
            comm.Parameters.AddWithValue("?DEGREE", (schedule.DEGREE == "") ? null : schedule.DEGREE);
            comm.Parameters.AddWithValue("?COURSES", (schedule.COURSES == "") ? "" : schedule.COURSES);
            comm.Parameters.AddWithValue("?FINAL", (schedule.FINAL == "") ? "" : schedule.FINAL);
            comm.Parameters.AddWithValue("?ELECTIVE", (schedule.ELECTIVE == "") ? "" : schedule.ELECTIVE);
            comm.Parameters.AddWithValue("?DEPTH", (schedule.DEPTH == "") ? "" : schedule.DEPTH);
            comm.Parameters.AddWithValue("?NOTES", (schedule.NOTES == "") ? "" : schedule.NOTES);
            comm.Parameters.AddWithValue("?LONGNAME", (schedule.LONGNAME == "") ? "" : schedule.LONGNAME);
            comm.Parameters.AddWithValue("?SPECIALTY", (schedule.SPECIALTY == "") ? "" : schedule.SPECIALTY);
            comm.Parameters.AddWithValue("?FOCUS", (schedule.FOCUS == "") ? "" : schedule.FOCUS);
            comm.Connection = conn;
            try
            {
                comm.ExecuteNonQuery();
            }
            catch (MySqlException err)
            {
                Console.WriteLine(err.ToString());
                throw err;
            }
            conn.Dispose();
            conn.Close();
            return View();
        }
        [Route("/Add-UGCourse-Redirect")]
        public IActionResult AddUGCourseRedirect(Course course)
        {
            Console.WriteLine(course.ToString());
            using MySqlConnection conn = new(Utils.ConnectionString);
            conn.Open();
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO ugcatalog (AREA, ID, NAME, DESCRIPTION, CREDIT, PREREQ, REC) VALUES (?AREA, ?ID, ?NAME, ?DESCRIPTION, ?CREDIT, ?PREREQ, ?REC)";
            comm.Connection = conn;
            comm.Parameters.AddWithValue("?AREA", course.AREA);
            comm.Parameters.AddWithValue("?ID", course.ID);
            comm.Parameters.AddWithValue("?NAME", course.NAME);
            comm.Parameters.AddWithValue("?DESCRIPTION", course.DESCRIPTION == "" ? "No description available." : course.DESCRIPTION);
            comm.Parameters.AddWithValue("?CREDIT", course.CREDITS == "" ? null : course.CREDITS);
            comm.Parameters.AddWithValue("?PREREQ", course.PREREQ == "" ? null : course.PREREQ);
            comm.Parameters.AddWithValue("?REC", course.REC == "" ? null : course.REC);

            comm.Connection = conn;
            try
            {
                comm.ExecuteNonQuery();
            }
            catch (MySqlException err)
            {
                Console.WriteLine(err.ToString());
                throw err;
            }
            conn.Dispose();
            conn.Close();
            return View(course);
        }
        [Route("/Add-Course-Redirect")]
        public IActionResult AddCourseRedirect(Course course)
        {
            Console.WriteLine(course.ToString());
            using MySqlConnection conn = new(Utils.ConnectionString);
            conn.Open();
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO catalog (AREA, ID, NAME, DESCRIPTION, CREDIT, PREREQ, REC) VALUES (?AREA, ?ID, ?NAME, ?DESCRIPTION, ?CREDIT, ?PREREQ, ?REC)";
            comm.Connection = conn;
            comm.Parameters.AddWithValue("?AREA", course.AREA);
            comm.Parameters.AddWithValue("?ID", course.ID);
            comm.Parameters.AddWithValue("?NAME", course.NAME);
            comm.Parameters.AddWithValue("?DESCRIPTION", course.DESCRIPTION == "" ? "No description available." : course.DESCRIPTION);
            comm.Parameters.AddWithValue("?CREDIT", course.CREDITS == "" ? null : course.CREDITS);
            comm.Parameters.AddWithValue("?PREREQ", course.PREREQ == "" ? null : course.PREREQ);
            comm.Parameters.AddWithValue("?REC", course.REC == "" ? null : course.REC);

            comm.Connection = conn;
            try
            {
                comm.ExecuteNonQuery();
            }
            catch (MySqlException err)
            {
                Console.WriteLine(err.ToString());
                throw err;
            }
            conn.Dispose();
            conn.Close();
            return View(course);
        }
        [Route("/Administration")]
        public IActionResult Administration()
        {
            return View(new Course());
        }
        [Route("/Add-Undergraduate-Sheet")]
        public IActionResult AddUndergraduateSheet()
        {
            return View(new UndergraduateSchedule());
        }
        [Route("/Add-Graduate-Sheet")]
        public IActionResult AddGraduateSheet()
        {
            return View(new GraduateSchedule());
        }
        [Route("/Add-Graduate-Course")]
        public IActionResult AddGraduateCourse()
        {
            return View(new Course());
        }
        [Route("/Add-Undergraduate-Course")]
        public IActionResult AddUndergraduateCourse()
        {
            return View(new Course());
        }
        [Route("/General-Scheduling")]
        public IActionResult GeneralScheduling()
        {
            return View();
        }
        [Route("/Undergraduate-Catalog")]
        public IActionResult UndergraduateCatalogView()
        {
            return View();
        }
        [Route("/Graduate-Catalog")]
        public IActionResult GraduateCatalogView()
        {
            return View();
        }

        [Route("/Home")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("/Help")]
        public IActionResult Help()
        {
            return View(new HelpMessage());
        }
        [Route("/Message-Submission")]
        public IActionResult SubmitHelpMessage(HelpMessage Model)
        {
            using (MySqlConnection conn = new(Utils.ConnectionString))
            {
                conn.Open();
                try
                {
                    MySqlCommand comm = conn.CreateCommand();
                    comm.CommandText = "INSERT INTO helpmessages (timestamp, contents, whoami) VALUES (?time, ?msg, ?who)";
                    comm.Connection = conn;
                    comm.Parameters.AddWithValue("?time", Model.TIMESTAMP!);
                    comm.Parameters.AddWithValue("?msg", Model.MESSAGE!);
                    comm.Parameters.AddWithValue("?who", Model.NAME!);
                    comm.ExecuteNonQuery();
                }
                catch (MySqlException)
                {
                }
                finally
                {
                    conn.Dispose();
                    conn.Close();
                }
            }
            return View();
        }
        [Route("/Undergraduate-Scheduling")]
        public IActionResult UndergraduateScheduling()
        {
            return View(new UndergraduateRequest());
        }

        [Route("/Graduate-Scheduling")]
        public IActionResult GraduateScheduling()
        {
            return View(new GraduateRequest());
        }

        [Route("/Undergraduate-Schedule")]
        public IActionResult UndergraduateRequest(UndergraduateRequest req)
        {
            UndergraduateSchedule schedule = new();
            using (MySqlConnection con = new(Utils.ConnectionString))
            {
                using MySqlCommand cmd = new("SELECT * FROM areas WHERE AREA='" + req.AREA!.Replace(" ", "") + "' AND DEGREE='" + req.TYPE!.Replace(" ", "") + "'");
                cmd.Connection = con;
                con.Open();
                using (MySqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        schedule.AREA = sdr["AREA"].ToString()!;
                        schedule.DEGREE = sdr["DEGREE"].ToString()!;
                        schedule.LONGNAME = sdr["LONGNAME"].ToString()!;
                        schedule.COURSES = sdr["COURSES"].ToString()!;
                        schedule.ELECTIVE = sdr["ELECTIVE"].ToString()!;
                        schedule.FINAL = sdr["FINAL"].ToString()!;
                        schedule.NOTES = sdr["NOTES"].ToString()!;
                    }
                }
                con.Close();
            }
            return View(schedule);
        }

        [Route("/Graduate-Schedule")]
        public IActionResult GraduateRequest(GraduateRequest req)
        {
            GraduateSchedule schedule = new();
            using (MySqlConnection con = new(Utils.ConnectionString))
            {
                using MySqlCommand cmd = new("SELECT * FROM areas WHERE AREA='" + req.AREA!.Replace(" ", "") + "' AND DEGREE='" + req.TYPE!.Replace(" ", "") + "'");
                cmd.Connection = con;
                con.Open();
                using (MySqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        schedule.AREA = sdr["AREA"].ToString()!;
                        schedule.LONGNAME = sdr["LONGNAME"].ToString()!;
                        schedule.DEGREE = sdr["DEGREE"].ToString()!;
                        schedule.COURSES = (sdr["COURSES"].ToString()! == "") ? "" : sdr["COURSES"].ToString()!;
                        schedule.FINAL = (sdr["FINAL"].ToString()! == "") ? "" : sdr["FINAL"].ToString()!;
                        schedule.ELECTIVE = (sdr["ELECTIVE"].ToString()! == "") ? "" : sdr["ELECTIVE"].ToString()!;
                        schedule.FOCUS = (sdr["FOCUSELECT"].ToString()! == "") ? "" : sdr["FOCUSELECT"].ToString()!;
                        schedule.DEPTH = (sdr["DEPTH"].ToString()! == "") ? "" : sdr["DEPTH"].ToString()!;
                        schedule.SPECIALTY = (sdr["SPECIALTY"].ToString()! == "") ? "" : sdr["SPECIALTY"].ToString()!;
                        schedule.NOTES = sdr["NOTES"].ToString()!;
                    }
                }
                con.Close();
            }
            return View(schedule);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}