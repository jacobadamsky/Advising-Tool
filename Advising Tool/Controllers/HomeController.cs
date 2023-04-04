using Advising_Tool.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Diagnostics;

namespace Advising_Tool.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [Route("/Graduate-Catalog")]
        public IActionResult CatalogView()
        {
            return View();
        }

        [Route("/Home")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("/Undergraduate-Scheduling")]
        public IActionResult UndergraduateScheduling()
        {
            return View(new GraduateRequest());
        }

        [Route("/Graduate-Scheduling")]
        public IActionResult GraduateScheduling()
        {
            return View(new GraduateRequest());
        }

        [Route("/Graduate-Schedule")]
        public IActionResult GraduateRequest(GraduateRequest req)
        {
            GraduateSchedule schedule = new();
            using (MySqlConnection con = new(Utils.ConnectionString))
            {
                using MySqlCommand cmd = new("SELECT * FROM areas WHERE AREA='" + req.AREA!.Replace(" ", "") +"' AND DEGREE='" + req.TYPE!.Replace(" ", "") + "'");
                cmd.Connection = con;
                con.Open();
                using (MySqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        schedule.FINAL = sdr["FINAL"].ToString()!;
                        schedule.ELECTIVE = sdr["ELECTIVE"].ToString()!;
                        schedule.AREA = sdr["AREA"].ToString()!;
                        schedule.DEGREE = sdr["DEGREE"].ToString()!;
                        schedule.COURSES = sdr["COURSES"].ToString()!;
                        schedule.LONGNAME = req.NAME;
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