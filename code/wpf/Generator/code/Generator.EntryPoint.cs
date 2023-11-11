/*
Color Names

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

namespace SA {
    using Console = System.Console;
    using System.Reflection;
    using Type = System.Type;
    using Brushes = System.Windows.Media.Brushes;

    static class Start {

        static void Main() {
            Type type = typeof(Brushes);
            PropertyInfo[] properties = type.GetProperties(BindingFlags.Public | BindingFlags.Static);
            Console.WriteLine(DefinitionSet.bra);
            foreach (var property in properties)
                Console.WriteLine(DefinitionSet.FormatEntry(property.Name));
            Console.WriteLine(DefinitionSet.ket);
        } //void Main

    } //class Start

}