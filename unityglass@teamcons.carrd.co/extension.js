import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import St from 'gi://St';


// load the file
// todo
function loadTheme() {
    let theme = settings.get_string('Launcher');
    path = Me.path + '/launcher/' + theme;
}





// Main class
//todo correct dispose and enable
export default class ApplyUnityGlass
{



    // Upon extension activation
    enable()
    {
        Me = this;
        settings = Me.getSettings('org.gnome.shell.extensions.unityglass');
        loadTheme();

    }




    // Upon extension deactivation
    disable()
    {
        Me = null;
        destroyObjects();
    }
}
