using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore; //La base de datos en memoria que instalamos
using WebAPI.Api.Models; //la carpeta models del paquete

namespace WebAPI.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            /*Añadimos el servicio (el contexto de la base de datos) que será una in-memory db*/

            services.AddDbContext<TodoContext>(opt =>
                                              opt.UseInMemoryDatabase("TodoList"));
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TodoApi", Version = "v1" });
            //});


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors(
                //options => options.WithOrigins("https://example.com").AllowAnyMethod() No puede ser porque aqui estamos permitiendo solo peticiones cruzadas (no vienen del mismo backend) a la api desde esa URL
                options => options.WithOrigins("*") //Ponemos un asterisco para que permita desde cualquier URL
                                        .AllowAnyMethod() //Desde cualquier URL y con cualquier método que traiga la peticion
                                        .AllowAnyHeader() //Desde cualquier URL y con cualquier header que traiga la petición
                
                );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                /*Usamos el servicio*/
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TodoApi v1"));
            }

            app.UseHttpsRedirection(); //Es para desactivar el https junto a eliminar la direccion del json Webapi y cambiar el Iexpress por el web api al arrancar

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
