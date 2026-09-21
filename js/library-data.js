// ========================================
// GULU PDF LIBRARY DATA
// CLASS 6 TO CLASS 10
// ========================================


// ========================================
// SUBJECT TEMPLATE
// ========================================

const SUBJECT_TEMPLATES = {

    english: {

        title: "English",

        subtitle:
            "English notes, chapters and study material",

        password:
            "priyanka mam",

        pdfs: []

    },


    maths: {

        title: "Mathematics",

        subtitle:
            "Mathematics chapters and practice material",

        password:
            "kruti mam",

        pdfs: []

    },


    science: {

        title: "Science",

        subtitle:
            "Science chapters, notes and important questions",

        password:
            "kruti mam",

        pdfs: []

    },


    "Social-science": {

        title: "Social Science",

        subtitle:
            "History, Geography, Civics and Economics",

        password:
            "sunita mam",

        pdfs: []

    },


    gujarati: {

        title: "Gujarati",

        subtitle:
            "Gujarati chapters, notes and study material",

        password:
            "purvi mam",

        pdfs: []

    },


    sanskrit: {

        title: "Sanskrit",

        subtitle:
            "Sanskrit chapters and study material",

        password:
            "priyanka mam",

        pdfs: []

    }

};


// ========================================
// CREATE FRESH SUBJECT DATA
// ========================================

function createSubjects() {

    const subjects = {};


    Object.entries(
        SUBJECT_TEMPLATES
    ).forEach(
        function ([key, subject]) {

            subjects[key] = {

                title:
                    subject.title,

                subtitle:
                    subject.subtitle,

                password:
                    subject.password,

                pdfs:
                    []

            };

        }
    );


    return subjects;

}


// ========================================
// COMPLETE LIBRARY
// ========================================

const LIBRARY_DATA = {

    class6: {

        name:
            "Class 6",

        fullName:
            "GSEB Class 6",

        subjects:
            createSubjects()

    },


    class7: {

        name:
            "Class 7",

        fullName:
            "GSEB Class 7",

        subjects:
            createSubjects()

    },


    class8: {

        name:
            "Class 8",

        fullName:
            "GSEB Class 8",

        subjects:
            createSubjects()

    },


    class9: {

        name:
            "Class 9",

        fullName:
            "GSEB Class 9",

        subjects:
            createSubjects()

    },


    class10: {

        name:
            "Class 10",

        fullName:
            "GSEB Class 10",

        subjects:
            createSubjects()

    }

};


// ========================================
// EXISTING CLASS 10
// SOCIAL SCIENCE PDFs
// ========================================

LIBRARY_DATA
    .class10
    .subjects["Social-science"]
    .pdfs = [

        {
            name:
                "SECTION-B CH-1",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_1_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-2",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_2_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-3",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_3_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-4",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_4_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-5",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_5_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-8",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_8_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-9",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_9_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-10",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_10_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-11",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_11_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-15",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_15_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-16",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_16_Section_B_Final.pdf"
        },


        {
            name:
                "SECTION-B CH-17",

            file:
                "pdfs/Class-10/Social-science/GSEB_Class_10_Chapter_17_Section_B_Final.pdf"
        }

    ];

LIBRARY_DATA
    .class10
    .subjects["science"]
    .pdfs = [

        {
            name:
                "SECTION-B CH-1",
            
            file:
                "pdfs/Class 10/Science/GSEB_Class_10_Science_Section_C_Chapter_1.pdf"
        },    
            
        {
            name:
                "SECTION-B CH-2",
            file:
                "pdfs/Class-10/Science/GSEB_Class_10_Science_Section_C_Chapter_2.pdf"
        },

      
            
            
            
            
            ]  





    
           
        



    

        