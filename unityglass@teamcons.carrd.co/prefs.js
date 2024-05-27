import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _}
from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
let Me;




// Generale a row for each launcher
function newThemeRow(settings, group) {
    let themesDir = Gio.File.new_for_path(Me.path + '/launcher');
    let themes = [];

    // Check whats there
    try {
        let themeDirEnumerator = themesDir.enumerate_children
        ('standard::name', Gio.FileQueryInfoFlags.NONE, null);
        let themeDir;
        while(themeDir = themeDirEnumerator.next_file(null)) {
            themes.push(themeDir.get_name());
        }
    } catch(e) {
        themes = [];
    }

    // Uh compare shit
    themes.sort((a, b) => a.localeCompare(b));
    let options = themes.slice();

    // Create an item
    options.unshift(_('Follow System'));
    const themeRow = new Adw.ComboRow({
        title: _('Theme'),
        model: Gtk.StringList.new(options),
    });

    // Add new row/item
    group.add(themeRow);
    let index = themes.indexOf(settings.get_string('Launcher'));
    themeRow.set_selected(index + 1);

    // Bind to settings
    themeRow.connect('notify::selected', () => {
        let selected = themeRow.get_selected();
        let theme = selected == 0 ? '' : themes[selected - 1];
        settings.set_string('Launcher', theme);
    });
    settings.connect('changed::Launcher', () => {
        let index = themes.indexOf(settings.get_string('Launcher'));
        themeRow.set_selected(index + 1);
    });
}




// Create pref page
export default class LauncherPref extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        Me                      = this;
        const settings          = Me.getSettings('org.gnome.shell.extensions.unityglass');
        const page              = new Adw.PreferencesPage();
        window.add(page);

        // Themegroup is launcher thees
        const themeGroup        = new Adw.PreferencesGroup();
        page.add(themeGroup);
        newThemeRow(settings, themeGroup);

    }
}