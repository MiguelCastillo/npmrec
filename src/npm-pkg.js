const fs = require("fs");
const path = require("path");

function npmPkgFields(settings, targets) {
  targets
    .map(target => ({
        fields: JSON.parse("" + fs.readFileSync(path.join(target, "package.json"))),
        path: target
      })
    )
    .forEach(pkg => {
      console.log("npm-pkg", pkg.path);

      settings.fields
        .filter(field => pkg.fields[field])
        .forEach(field => {
          if (pkg.fields[field].constructor === Object) {
            var items = Object.keys(pkg.fields[field]);

            if (items.length) {
              console.log(`  ${field}:`);
              Object.keys(pkg.fields[field]).forEach(item => {
                console.log(`    - ${item}: ${pkg.fields[field][item]}`);
              });
            }
            else {
              console.log(`  ${field} - empty`);
            }
          }
          else if (Array.isArray(pkg.fields[field])) {
            var items = pkg.fields[field];

            if (items.length) {
              console.log(`  ${field}:`);
              pkg.fields[field].forEach(item => {
                console.log(`    - ${item}: ${pkg.fields[field][item]}`);
              });
            }
            else {
              console.log(`  ${field} - empty`);
            }
          }
          else {
            console.log(`  ${field}: ${pkg.fields[field]}`);
          }
        })
    });

  return Promise.resolve();
}

module.exports = npmPkgFields;
