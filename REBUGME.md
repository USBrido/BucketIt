Know Issues, Code Flaws and Bugs
=========

## Preliminary notes

Due to some syntax issues and structural bugs during development parts of the code weren't tested or developed properly.

1. Early stage syntax issue over Route structure prevented server to run and render pages properly.
2. API tests were done via Postman, but the logic that sorts through the results haven't been tested yet.
3. Some of the front-end functionalities were delayed due to a misbehavior of the Bootstrap modals.
4. Earlier bug on the database made it display as inexistent. Warning disappeared, but not sure if the bug is there or not ( or why).
5. The app was developed without practical help or guidance.



## Back-end - Current issues

1. /Register route doesn't advance. Console displays "An invalid form control with name='' is not focusable."
(docs/invalid_form_control.png)
  According to research it has to do with a failed validation on the form, but the solutions tested previously don't seem to work;
2. /Login route not working. (Front end button clicks, but seems unable to find the file);
3. /Update route hasn't been tested since Register doesn't want to work. Code has been written, but unsure if behaves properly;
4. Logic for the API tested, but not implemented, nor connected to the front-end. (It has worked on Postman, but the logic that filters the results hasn't been developed);
5. /Logout route created but untested since neither Login or Register work.
6. /cookie-session not tested since login has not been successful.
7. IDs and key are still present on code and haven't been assigned into variables inside .ENV, since the functionalities are not working and no actual resources were spent during development, there has been no need to hide those.

## Front-end - Current issues

1.  /update button and view coded but not tested since the route that supplies the functionality isn't functional. Once the route works, the logic for "if user session is present" should be working properly and showing the button.
2. Since the logic that sorts through the results hasn't been develop the input field ("search bar" style) hasn't been inplemented under the Navbar. Also, the logics that sorts through the database results for the user, to display the categories is also not developed.
3. Final styling for the page not deployed since functionalities are not present. Also, explanatory card not implemented. Will do a pop-dialogue box once user opens the page.


