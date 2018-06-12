use std::process::Command;
use std::env;
use std::path::Path;

fn main() {
    let out_dir = env::var("OUT_DIR").unwrap();
    println!("cargo:rerun-if-changed=app");
    println!("cargo:rustc-env=APP_DIST={}", out_dir);

    Command::new("npm").args(&["i"])
                       .current_dir(&Path::new("app"))
                       .status()
                       .unwrap();
    Command::new("npm").args(&["run", "build", "--", "--output-path", &out_dir])
                       .current_dir(&Path::new("app"))
                       .status()
                       .unwrap();
}