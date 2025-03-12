using System;
class Usuario
{
    public string Nome { get; set; }
    public string Tipo { get; set; } // Administrador ou Comum

    public Usuario(string nome, string tipo)
    {
        Nome = nome;
        Tipo = tipo;
    }
}