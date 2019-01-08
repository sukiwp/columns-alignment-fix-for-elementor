=== Columns Alignment Fix for Elementor ===
Contributors: sukiwp, daviedr
Tags: 
Requires at least: 4.6
Tested up to: 5.0
Stable tag: 1.1.0
Requires PHP: 5.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add an option to fix Elementor's inconsistent columns alignment when using columns gap on sections.

== Description ==

The `Columns Gap` feature on Elementor's `Section` and `Inner Section` will leave paddings on the sides. This behavior makes difficult for users who want to have consistent content wrapper alignment. By default, you need to manually adjust padding on each column to get the results you want and it is hideous!

Using this plugin, now you can freely use the `Columns Gap` feature without worrying about the inconsistent columns alignment with the rest of your content. This plugin will add an option to automatically "fix" that native behavior and make your columns aligned correctly with your content. No more adjusting padding on each column!

== Frequently Asked Questions ==

= What's wrong about the default Elementor's columns alignment? =

A clear explanation could be found here: [Elementor Issue #452](https://github.com/pojome/elementor/issues/452#issuecomment-369609547)

= How to enable the fix? =

The plugin will add a new option to `Section` or `Columns` widget settings panel on your Elementor editor page. You can find the option called `Enable Columns Alignment Fix` on the `Layout` tab.

= How does the fix work? =

Once enabled on a section, it will remove the default "weird" columns gap on the left and right side of the section. This fix is done by CSS, so no content would lose.

= Will activating this plugin break my content I made before? =

Not at all, the fix is very optional and could be enabled on each `Section` or `Columns` widget. So you can choose which sections you want to have the fix enabled. You might not need to enable the fix on your existing sections, your content would stay the same.

= What if I enabled the fix on my sections, and then decided to deactivate the plugin in the future? =

No worries. Once the plugin is deactivated, you would have default Elementor's columns alignment back.

== Installation ==

1. Go to Plugins > Add New.
2. Search for "Columns Alignment Fix for Elementor" and wait until the plugin appears in the results.
3. Click Install button and then Activate the plugin right away.
4. Edit your post / page using Elementor editor, select the `Section` widget > `Layout` tab > `Enable Columns Alignment Fix` toggle.

== Changelog ==

= v1.1.0 =

* Use inline CSS instead of static CSS file.
* Add `overflow-x: hidden` CSS on content container to fix overflowing columns in small devices.

= v1.0.1 =

* Add load textdomain for translation

= v1.0.0 =

* Initial release