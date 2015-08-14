Using the Module Loader
==============

The module loader is based on the principle that CSnap should be able to
be fully customizable. Different applications have different goals and
different needs, and the module loader allows a developer to adapt CSnap
without having to create an entirely new fork or load many large and unnecessary
libraries for every single project. A module has four vectors
for applying new code: creating new blocks, importing libraries, injecting
javascript, or applying other modules. While each of the four separate
vectors are optional, each module requires a package file to provide metadata
and structure.

Creating the package file
--------------

The package file is a standard json file with the name "package.json". It
contains one optional and four required fields.

- name: A string field identifying a unique name for a module. (required)
- description: A string field providing a simple one or two sentence
description of the module's intent. (required)
- version: A string field containing three period delimited integers.
See below for more information. (required)
- dependencies: A dictionary field containing 0 or more parent objects.
Each key is the name of the parent module to look for, and the corresponding
value is a comparison type and the desired version of the parent module. See below for more information (required)
- libraries: An array field containing 0 or more javascript libraries for
the module to use. (optional)

Version numbers are our friends
--------------

We like version numbers. Version numbers are our friends. They help keep
things organized, help us keep track of backwards compatibility, and let us
keep track of what modules can interact with what other modules. They do a
lot of work for us for little effort, so try to keep them happy. Sometimes
I host parties for my version numbers. The rascals appreciate an open bar.

Each version number consists of three period delimited integer. These integers
represent the major version, minor version, and patch version of the 
module, respectively. For example, if a module is on version "1.2.3", then
it is on major version 1, minor version 2, and patch version 3. The major
number keeps track of large changes affecting the overall intent or structure
of the module. The minor number keeps track of smaller changes that add a
new feature or make a major change to one component of the module. The patch
number keeps track of small changes, like simple bug fixes.

When creating a new module, it should always start with the version "1.0.0".
Every time an update is made, make sure to update the version. Figure out
which of the three numbers corresponds to your change, and increment it. The
numbers to the right of the incremented number should revert to 0. For example,
the BeadLoomModule was at "1.0.1" before a new block was added to it. Because that
was considered a minor change (adding a new feature without changing the overall
structure or intent of the module), the minor version was incremented, and the
new version became "1.1.0". If you aren't sure which to update, use your best judgment. :)

When looking at the version of parents, we need more than just a version. After all,
a new version of a parent might be backwards compatible, so more than one version of
that parent might be appropriate. We use one of three characters to figure out how
to compare modules: ">", "~", and "=". The ">" comparison looks for a version equal
to or later than the one listed. "~" looks for a version
with the same major and minor version number, but a greater or equal patch version.
"=" looks for an identical version. As an example, if the dependency "ParentModule": "~1.3.2"
is listed, it would match versions "1.3.2", and "1.3.5" but not "1.2.2" or "2.0.0".

If a module is found that matches the name but the not the version listed, it will
still be loaded without an obvious error message. We don't want to confuse students,
and oftentimes a module will still work even if it's not quite the right version.
However, an error will be logged in the browser's console. When testing a module,
make sure to check the console to see if there are any issues. If you are helping
out a student who is seeing issues, check the module to see if it's complained about
any module versions.

Adding arbitrary code
--------------

To add arbitrary code to CSnap using the module loader, simply put whatever code
you need in a file named "code.js". It's as easy as that. However, keep in mind that
this code is applied AFTER CSnap has started running, which means there are limitations.
Anything affecting structures that are already in place, like the menus, can be tricky.

Creating new blocks
--------------

Creating new blocks requires the use of an optional file, blocks.json. Each field in the 
json file represents one new block. The key of the field represents a name of the block.
Make sure it's alphanumeric and contains no spaces, like "setCoordinateScale". It's ugly, 
but it's only for the internal representation. The value is a dictionary field containing
one optional and three required subfields.

- type: A string field. Either "command", for a block that does something on its own, or "reporter" for
a block that just returns a value. (required)
- category: A string field. This is the category it appears under in the GUI, for example
"control" or "looks". (required)
- spec: A string field. This is what the user actually sees. For blocks with user controlled
parameters, use %n for a number, %str for a string, or %col for a color. For example,
 "set coordinate scale to %n" would allow a user to enter in a scaling factor. (required) 
- defaults: An array field containing defaults for any input above. [0] would default the
above block to say "set coordinate scale to 0", while still allowing the user to change the value. (optional)

To actually add the code for the new blocks, create a folder called "blocks". 
In this folder, create a file for each block defined in blocks.json. The name
of this file should be "[name of the block].js". The block mentioned above would
be contained in a file called "setCoordinateScale.js". This is why it can have
no spaces! The file itself must contain a single javascript function with no
parameters, that only returns a second, inner function. This inner function
contains the actual block code. For example, "setCoordinateScale.js":

   (function () {
      return function (num) {
         coordinateScale = num
      };
   }());

The parameters of the inner function correspond to the parameters defined in
the blocks.json spec. Since setCooardinateScale had one parameter in the input,
it gets one parameter in the function.

Modules, and the community site
--------------

To add a module to the community site, go into the admin panel. As of 2/24/15, the
URL is: https://community.csdt.rpi.edu/admin . Find the modules option, and click
on it, and then "add module" in the new screen. Enter in the name of the module (this should
be the same as the name in package.json!) and upload a zipped file containing the module. When you save it,
you may notice the module name is changed slightly. Don't worry about it, this is
called "slugifying" and is used to keep things a little simpler for development.

The module won't actually be in use yet, however. Modules are paired with applications,
and it's currently not attached to any. Go into an application in the admin panel, and
notice the drop down bar labeled "module". Simply go into this drop down bar, choose
the name of the module you want associated with the application, and save. Keep in mind
that each application can only have one module, but each module can be used in many
applications.

Libraries
--------------

But wait! You may be thinking. You mentioned the module loader can use four vectors!
You mentioned arbitrary code, that was the code.js stuff. You mentioned blocks, that's
the blocks.json and block folder stuff. You mentioned loading other modules, that's
the dependencies in package.json. But what about loading libraries???

That's a good question, and I'm glad you asked. Loading in libraries is done similarly
to loading in a module. From the admin panel, there is an option for libraries. Click
on that link, then click the "add library" button. Just like adding in a module, choose
the name of the library and upload its javascript file. Then, any modules listing that
library in its package.json will automatically grab the library when the module is
loaded.

Current Release
--------------
The current release is 20150814.
