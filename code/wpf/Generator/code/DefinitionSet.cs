/*
Color Names

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

namespace SA {

    static class DefinitionSet {

        internal static string FormatEntry(string name) =>
            $@"    ""{name}"",";
        internal const string bra = "const wpfColorNames = [";
        internal const string ket = "];";

    } //class DefinitionSet

}