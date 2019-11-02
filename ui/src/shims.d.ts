declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*.graphql' {
    import { DocumentNode } from 'graphql';

    const value: DocumentNode;
    export default value;
}

declare const process: {
    env: {
        GRAPHQL_URL: string,
        NODE_ENV: string
    }
}
