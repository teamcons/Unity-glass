import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import St from 'gi://St';


// Main class
export default class ApplyUnityGlass
{

    // Upon extension activation
    enable()
    {
        // Grab the CSS to load
        let themeContext = St.ThemeContext.get_for_stage(global.stage);
        let stylesheetPath = './unity.css'

        // Load it
        try {
            this.stylesheetFile = Gio.File.new_for_path(stylesheetPath);
            themeContext.get_theme().load_stylesheet(this.stylesheetFile);
        }
        catch(e) {}
    }

    // Upon extension deactivation
    disable()
    {
        let themeContext = St.ThemeContext.get_for_stage(global.stage);
        if (this.stylesheetFile) { themeContext.get_theme().unload_stylesheet(this.stylesheetFile);}
    }
}
