
namespace Advising_Tool.Models
{
    public class Course
    {
        public Course(string? aREA, string? iD, string? dESC, string? nAME, string? cREDITS, string? pREREQ, string? rEC)
        {
            AREA = aREA;
            ID = iD;
            DESC = dESC;
            NAME = nAME;
            CREDITS = cREDITS;
            PREREQ = pREREQ;
            REC = rEC;
        }

        public string? AREA
        {
            get; set;
        }
        public string? ID
        {
            get; set;
        }
        public string? DESC
        {
            get; set;
        }
        public string? NAME
        {
            get; set;
        }
        public string? CREDITS
        {
            get; set;
        }
        public string? PREREQ
        {
            get; set;
        }
        public string? REC
        {
            get; set;
        }
        public override string ToString()
        {
            return AREA + ", " + ID + ", " + DESC + ", " + NAME + ", " + CREDITS + ", " + PREREQ;
        }
    }
}
