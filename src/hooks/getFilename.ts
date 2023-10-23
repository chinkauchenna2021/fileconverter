import React from "react";
import path from "path";
export const getFilename = (filename: string) => path.parse(filename).name;

