/* =========================================================
   GULU PDF LIBRARY
   FINAL SCRIPT
   Login system removed
========================================================= */


/* =========================================================
   SESSION HELPERS
========================================================= */

function clearLibrarySession() {

    sessionStorage.removeItem("selectedClass");

    sessionStorage.removeItem("selectedSubject");

    sessionStorage.removeItem("subjectUnlocked");

}


/* =========================================================
   GO TO CLASS SELECTION
========================================================= */

function goToClasses() {

    window.location.replace(
        "classes.html"
    );

}


/* =========================================================
   GO TO SUBJECT LIBRARY
========================================================= */

function goToLibrary() {

    window.location.replace(
        "library.html"
    );

}


/* =========================================================
   SAFE CLASS CHECK
========================================================= */

function getSelectedClass() {

    const selectedClass =
        sessionStorage.getItem(
            "selectedClass"
        );

    if (
        !selectedClass ||
        typeof LIBRARY_DATA === "undefined" ||
        !LIBRARY_DATA[selectedClass]
    ) {

        return null;

    }

    return selectedClass;

}


/* =========================================================
   SAFE SUBJECT CHECK
========================================================= */

function getSelectedSubject() {

    const selectedClass =
        getSelectedClass();


    if (!selectedClass) {

        return null;

    }


    const selectedSubject =
        sessionStorage.getItem(
            "selectedSubject"
        );


    const currentClass =
        LIBRARY_DATA[selectedClass];


    if (
        !selectedSubject ||
        !currentClass.subjects[selectedSubject]
    ) {

        return null;

    }


    return selectedSubject;

}


/* =========================================================
   SUBJECT ACCESS CHECK
========================================================= */

function isSubjectUnlocked() {

    return (
        sessionStorage.getItem(
            "subjectUnlocked"
        ) === "true"
    );

}


/* =========================================================
   OPTIONAL PAGE PROTECTION
   Used only when another page needs it.
========================================================= */

function protectLibraryPage() {

    const selectedClass =
        getSelectedClass();


    if (!selectedClass) {

        clearLibrarySession();

        goToClasses();

        return false;

    }


    return true;

}


/* =========================================================
   PROTECT SUBJECT PAGE
========================================================= */

function protectSubjectPage(
    subjectKey
) {

    const selectedClass =
        getSelectedClass();


    const selectedSubject =
        getSelectedSubject();


    if (
        !selectedClass ||
        !selectedSubject ||
        selectedSubject !== subjectKey ||
        !isSubjectUnlocked()
    ) {

        goToLibrary();

        return false;

    }


    return true;

}


/* =========================================================
   PROTECT VIEWER PAGE
========================================================= */

function protectViewerPage() {

    const selectedClass =
        getSelectedClass();


    const selectedSubject =
        getSelectedSubject();


    if (
        !selectedClass ||
        !selectedSubject ||
        !isSubjectUnlocked()
    ) {

        clearLibrarySession();

        goToClasses();

        return false;

    }


    return true;

}


/* =========================================================
   BACK TO CLASSES
========================================================= */

function backToClasses() {

    clearLibrarySession();

    goToClasses();

}


/* =========================================================
   BACK TO SUBJECTS
========================================================= */

function backToSubjects() {

    window.location.replace(
        "library.html"
    );

}


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Gulu Library Error:",
            event.error || event.message
        );

    }
);