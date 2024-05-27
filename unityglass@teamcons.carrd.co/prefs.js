import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _}
from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
let Me;

function newRow(settings, group, title, key) {
    const actionRow = new Adw.ActionRow({
        title: title,
    });
    group.add(actionRow);
    const switcher = new Gtk.Switch({
        active: settings.get_boolean(key),
        valign: Gtk.Align.CENTER,
    });
    actionRow.add_suffix(switcher);
    actionRow.set_activatable_widget(switcher);
    settings.bind(key, switcher, 'active', Gio.SettingsBindFlags.DEFAULT);
}

function newThemeRow(settings, group) {
    let themesDir = Gio.File.new_for_path(Me.path + '/launcher');
    let themes = [];
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
    themes.sort((a, b) => a.localeCompare(b));
    let options = themes.slice();
    options.unshift(_('Follow System'));
    const themeRow = new Adw.ComboRow({
        title: _('Theme'),
        model: Gtk.StringList.new(options),
    });
    group.add(themeRow);
    let index = themes.indexOf(settings.get_string('Launcher'));
    themeRow.set_selected(index + 1);
    themeRow.connect('notify::selected', () => {
        let selected = themeRow.get_selected();
        let theme = selected == 0 ? '' : themes[selected - 1];
        settings.set_string('Launcher', theme);
    });
    settings.connect('changed::theme', () => {
        let index = themes.indexOf(settings.get_string('Launcher'));
        themeRow.set_selected(index + 1);
    });
}

export default class DynamicIconsPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        Me = this;
        const settings = Me.getSettings('org.gnome.shell.extensions.unityglass');
        const page = new Adw.PreferencesPage();
        window.add(page);
        
        const themeGroup = new Adw.PreferencesGroup();
        page.add(themeGroup);
        newThemeRow(settings, themeGroup);

    }
}