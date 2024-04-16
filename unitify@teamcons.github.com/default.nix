with import <nixpkgs> {};
stdenv.mkDerivation {
    name = "unitify";
    buildInputs = [ gnumake glib sassc ];
}
