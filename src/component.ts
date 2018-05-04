import React from "react";

export type ComponentConstructor<P = {}> = React.ComponentClass<P> | React.StatelessComponent<P>;
