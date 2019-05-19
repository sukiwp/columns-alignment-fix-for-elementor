=== Columns Alignment Fix for Elementor ===
Contributors: sukiwp
Tags: 
Requires at least: 4.6
Tested up to: 5.2
Stable tag: 1.2.0
Requires PHP: 5.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add an option to fix Elementor's inconsistent columns alignment when using columns gap on sections.

== Description ==

= How Elementor's "Columns Gap" Originally Works =

The Columns Gap feature on Elementor's section and inner section will add unnecessary paddings on the sides. This makes inconsistent content alignment with theme's container or other sections' container.

= What This Plugin Does =

It will remove the unnecessary side paddings on Elementor's section and inner section. This fix is done by CSS, so no content would be lost.

= Example =

Try to create 3 sections on Elementor and fill them with any content widget. After that, try to set different "Columns Gap" for each section.

* Section 1, columns gap set to "Default"
* Section 2, columns gap set to "No Gap"
* Section 2, columns gap set to "Wide"

**Without the columns alignment fix:**
You will see inconsistent alignment on the content on those 3 sections.

**With the columns alignment fix:**
Those 3 sections will have consistent side padding!

== How to Activate The Columns Alignmet Fix

= 1. Global configuration =

Go to **Elementor > Settings > Style** and check the **Enabled globally** option.

= 2. Individual section =

When on Elementor builder, select a section / inner section, from the **Layout** tab and check the **Enable Columns Alignment Fix** option.

== Frequently Asked Questions ==

= Will activating this plugin break my content I made before? =

Not at all, the fix is very optional and could be enabled only on some specific sections. So you can choose which sections you want to have the fix enabled. You might not need to enable the fix on your existing sections, your content would stay the same.

= What if I enabled the fix on my sections, and then decided to deactivate the plugin in the future? =

No worries. Once the plugin is deactivated, you would have default Elementor's columns alignment back.

= After enabled, the columns look perfect on desktop, but on mobile devices my content sticks to screen edges. Why? =

This is expected as we already removed the native inconsistent side padding. The best suggestion is to set the section's left and right padding to a consistent number that you desire. For example, you want to have consistent 20px gap to the screen edges, so you set the section's left and right padding to 20px.

= Does it work with any theme? =

Absolutely! You can use any theme you like. But if you want a really ligthweight, fast, flexible, and fully compatible Elementor theme, you can try [Suki](https://sukiwp.com/).

== Installation ==

1. Go to **Plugins > Add New**.
2. Search for **Columns Alignment Fix for Elementor**.
3. Click **Install** button and then **Activate** the plugin right away.

== Changelog ==

= v1.2.0 =

* Add global setting on Elementor > Settings > Style.

= v1.1.0 =

* Use inline CSS instead of static CSS file.
* Add `overflow-x: hidden` CSS on content container to fix overflowing columns in small devices.

= v1.0.1 =

* Add load textdomain for translation

= v1.0.0 =

* Initial release