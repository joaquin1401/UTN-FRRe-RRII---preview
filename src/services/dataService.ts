import { AppData, Banner, CalendarActivity, NewsItem, QuickLink, Statistic } from '../types';

/**
 * SIMULADOR DE SERVICIO DE BASE DE DATOS
 * 
 * Este archivo centraliza todas las llamadas a los datos. En una aplicación real,
 * aquí harías peticiones `fetch` o llamarías a Firebase. 
 * Se usan promesas y retrasos (`delay`) para simular el comportamiento de una red.
 */

// Datos simulados (Mock Data) que alimentan la interfaz
const MOCK_DATA: AppData = {
  banners: [
    {
      id: "b1",
      title: "¡Internacionalizate!",
      subtitle: "Más allá de los libros: Por qué conocer otras culturas es la clave del éxito académico.",
      image: "https://images.unsplash.com/photo-1592487501226-7ed5e5dc80f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZGVyYXMlMjBkZWwlMjBtdW5kb3xlbnwwfHwwfHx8MA%3D%3D",
      order: 1
    },
    {
      id: "b2",
      title: "Doctorado en Informática en Inglaterra",
      subtitle: "Conocé la experiencia de Denise.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREhUSExMVFRUVFxUVFxcWGBUYFRYWFRoWFhUXFRUYHSggGBolHRYVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0dICUtLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTctKzc3Lf/AABEIAKgBKwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAgMEBQcAAf/EAEMQAAEDAgMGAwQIAwcDBQAAAAEAAhEDBAUSIQYxQVFhcRMigTKRobEHFCNCUnLB0WKCkhUkNFOy0uEWM0NzosLw8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACYRAAICAgIBBAIDAQAAAAAAAAABAhEDIRIxQQQTUXFhkSIysUL/2gAMAwEAAhEDEQA/ANSaEsBeNSwEDPQEsBeAJYCAOASgFwSggR6AvQuCFNrtsDYva0Us87yXR100Q2AWherObT6UGk+eg4N6EEo5wTE23VIVWtLQZ0O/RKwJwXOdAJ5apUKo2qvjQt3PESYaJ6nVMCLspjn1p1cQRkqGPynd8iiJZtsZiHh14jSpDT0iSPmtKSQHLly5MDlyaNywffb7wupXLHGGuBPIEIAdXL1cgDxdC9XIASQkkJa6EANkJJCcXhQA0Qo93cMpNzPcGjmVLIQVty95e1k+UiY4SDoUVYXRbW2M0JILwMz4HCSdytSsqq03BodJkOn14LRNm6zqltTc8y4jUo4tISmmyeQkEJ0hJISKGSE24J8hIcEhkdwTbmqQQm3BIZGe1MlqlOami1IZZhLC8CWFoQeheucACTw57lwVJtvULbKrG8gN95ASbpAXFlcio0GRJG4EFSgsj2CqFt4yJ8wc0iek/otdCUXY5KiFil94TdBLiCRy05rKMUxF94/NVAJ4ADQLT8ebMflcsqDcoB6oW2zHI6oep4PSj2QFc2N9Xt6fh0qpa0bgQHR2lVtK7KcNeYHMj5qVYS+wywPHKgr+DXqB2docw5Q3XiCQpG3rJoNHDO39UIbTVcla33jmRvhTsYxl1em2n91joJO8wNFX4LX9bKjBdLim0f5rdVr6ybBmn6xS/OFrKa7H4OXjty9Xh3JgZZWsJe85vvP/ANRT1m11B2djvNp/+HopR9t4/id8yk3A0UIT7DXBMS+sU80QQYd36KxQ7sWPs3/m/QIiVIZy5NXby1jiN4BIQvS2irng0+hQ3Q6C1eFD1njVZ1RrXMaA4wTrKInIsQB4xtJXp1nU2ZQJ04nUKw2Uxh9w8hzgcrATAjUkqk2ow9pr+LuLYkc9IT+x9Flo973OJzgcN2pgfFQkypSj0HhCDNuSQ9kcijRpkShTbOmC5nYrVdkS6A+vPg5uqOtkTNrT9fmUJYmGstnF0gRwEkdVZbHbT25ZTt2k5yTAIiRqZRKS6JhF3YZkJBCcKSQpNBohIITpCQQgYy4JBCdcEBbXbWXFtXNKmxhAAIJnWVLY0g0cE3CrNlMTfc24q1AA4kjTdorWEhk4JYSQlBaECgqDbz/Bu/Mz5ogCBtuscDgLenrBl8jiNWwVMgKTYrW7paRqfktbasf2fvPq9ek90Rmh3QHRbBSeHCQZBRHsb6KzGBqPyOWW3Ihh7rVMZIBk7gwrML9v2ZRHtmOb/krRUKlWLpe38w+aghTsME1Gfmb80yC422pnxbeBzSabC6ehJPuUnbfO11J7AXFvCJVGDdxmbSdLtTA0U+TddF1hLf7xS/MtSWIWOJXFOo15Zq0zBELR9k9oqt04tqMaNJEdNFXQkwoXFcuJTGZxWJ8Rwn7zhu6lLrUiBvldUbFVxJ+875lSK1ZnAhx5KEDLzY7Sm/8AN+gRACsxxnPVdTbSJYQJfBI03SY3oo2K+zolr35jmMz/AMoUiqCG89h3YoFfjVpS8pdmI35QTHdV+0eLV31KjPFdkDiAG6adwhihQEu7ptWJSoNWbW2we12V8AzMK8pbcWbtA868wR71mNZgylR7BoyaoSoTdh/jl1RqkhlRpJywARK6nS8o9EC4awC8oxpqtAfWa05XuAJ3cJ1TvwS43sM6Q8o7Ic2uZJZ6ogpVmyGT5soMdFT7Ts9juU0ymtAzihy2lXTewt7SgrZFgpXNJ2piQJ4SIRttHQzWrwCRAnTj0QJg9IitSLZJkQD8VnPs0xr+JuVMyB2XFe0R5R2C9IVogaKQU6Qm3JDGnLIduqrnXj5jywB2iZR7thtJ9SFPyZhUkTI0jVZ/tHU8aqK0R4jGujkob2Wui82IxPwrWoXRDarGj+cgfqjqFh9fFfCYaIeYc5ryBzbBHyCMLH6Q2eG3OQHRqIPBG0FmnBONWdWf0o0jHiUHt5kEO+CI8M22sq5DW1CHHc1zSCTyV80TxY39IFy0W4YKmVznt0aYcROu5AbKYP7nep20IJuC7QnUnuoFNryTI3qY72KWtHVWtyuJB8u480a/R5iFOnbvNSpEvkZjwgbvig+uczCc0AAiEMX969rQA4jXgYVUSmzYdtMUZ4LCwyKrm02kbtZJ+AKEsRZNOEN/23VqPoUHPmlTLS0QNDBGp470WPc1whC0ZZdtFG6hDSeEJvCL9pqNaPukE9gr9tAKjFvFzU0A8g1SsSXyE+M4rTqFppvJIAOhGXTmrHD8daXBuWPLO9AOC05dUG8aq6w/M2pJb5ckAyE46ezWSbWi52prsqMZlb5s2umseisNhaGSqRMy0nsqPDMTD3lhaGkyMx1jlA5lXWD3TbTPUqAw1hlxEAxrvKHK+hxjXfYW4tidO3Zneew4k9Fl+0W3td8hjm028A2C71JVb9IWPuuMrwRkI8sHy9xz1Wf+NrMrLk5fRuoqIVM2wrg+249MwPzaiHZ/anxqgbUp79JAEjrpvHos2ZXgyACjLY67p5v4zx/ZDVDWwq2ir/V6zQ1ulSm4TPIgp+jbOdR8SmSTEkTE+qjbU0PEp0qgcCaecETrldqDHQj4qBY42KdMN6RvhaxVnPN8SIS7XumaAOZ3dSs8689U3aVi1z4jeqIsarMMHsoWHTl9SrWvXdB14HkqvDtWnuUFE3CGf3ugep+RVntVdFtxuBiI+ag4SALqj+Y/JO7bPiv6JeQf9Sc3bG5Lw4Fo0DYiR37olq4uXgCs5oA1B3LMqNXUHqEQbZuIt2n+JqbSREW26ZdYtilB1F7G1GkkaAFCeEj7ekOo/VVuB2xrOcM0ERHWVaYVScyvTB4Ogn3rGSb2dUZJaNiNw2mwF7gBpqU2cRo/5jfeFXbRsD7Y8YLfgQg11sI3K0zN6NGpV2v9lwMckObeXrqdvDdM7g2QSC3jIjsvdiKeVtUD8Q+QSfpApB1Bs/jB9YKmTpbLgrejL9p8Te+lRpO1DC9wdqXGdIKevrgFtvGv2TQe6Y21tm0nspiTDZJPEu1UefLS/IiNNJoGmm0yjvaRzuIBiUyGHkUSlnkPdQ8iqxFQ24Kn4JipoVmVA3NlMxxKqAVPwS3NSs0AgR5teibViug8uK/iOdVLHAv1g8Oibt2POpB7dEt1WBmzSuYXOB80SN6EjNtsebaS13lABB48UC3407FH1tBZBcToRuQHes9oA7iR8UxR7E2Tvt2dwjdrzogPDP8Avs7o7tySYKPBGXtEqi8oZ2mvHsqZW7nNg9kW0WIO2xonxZB+6oQ4LexGyjvbmY17okoW1J2Xy1DmkAR89dEJbMvjN2K0XZajLaZdxaXHnlHLkoynXi8lph2DUrWnncAS0ZiSJj37llGNX1XE7xlMu8rqmVg3tY0SS4DdMAmVqO3l/wCFauHEtJ+QA97gsn2UqBl9SLtwdHq4Fs+8hRF7bNJLR5j/ANmRQa4uZS8rXHeQOJjiqN2m/T4n1VntM00ruuwzGckdneb9SqugfMO8rVaRndk66wepTAc7KJAOUOl7QdRnbHl95RRsbQAaSRB5ry/rVKuSrTaHsbPit1zCdTEcpJHbqvcO11adCud5G47OhY0noL6WGueS4PDmZTLNA7UFpcDzAPwQPtHY1KOWTmYXQ143flI4OjgifDrl9OXaloGoAkkHQwEK7W1MtXwmueWjI4h5JcHZYgyeR0jmtcM76Ms0ElbL+3Pkb2CTQIzP7hJtSMjewSaOr39wuk4R+pqD2Kg4U7ybuJUupuOvAqHhHsnuUD8Flh3+JodHfok7fO+3HZMMnxaf5j8lD2nd5m+qVbKvRCpVNR3CKdtHn6q2N8t+SD6btyI9sLj+7MaN/ln3IkSuyi2be8VNORV9Y1ZrM1khwJQzgNwWVQd/RO1sWNK4e9oHtAx8Ul5La2bZi9VrbZ2YgAuGvqEKMumvcWjhuOmqViWLi9w0vbAcHjO0GcgmBPwWf2ReXyHexrxUw6LnTZq2z+IMov8ADdANQyCSANBrvS9v76my3aS4auBaPxRJ0Wc43etuH0yAT4YgzuJKbxnE31aFOi8eWkSWnXMZEQegUyjy0OMuJD2qxRl1U8RgI0Ag79AoVxVLadM8mqKcgO9e3lw1zAAdwhUoqKSQcnJ2ywtL5rmZTOafSE19ZZzPuVW+p5QAVFLjzKKAQijYyPOcoJ01PJCqKtjT5ancJifQRl+okD3KRUrSI/RQy8pxjkrIos7d5A3rP8VqnO/ufmjy3dogDFfbf3PzTQIj4TrXZ3Wg2tOSs+wP/EM7rRGGEpMma2TWNhBu2Loq/wAqLA6OKEtrKjHVDLtcsaaj1Cldjj2QNliMzpMb/itS2aZFFrt5fAE8GzLlnOxOHio86w2Drx7gRqf3Wj0CHObRaMoYII9N3WN0qMr2dGNFN9KNUZabZ9o5o6MGb5ke5ZvbW7xVY4A/9xgJHAPIEnlvO/kjD6TrwGvk35WBo7u3/JCbKzQWOIMaatMHf5mmDruKyh0zaXaCbbTZa4rubXY1tR8Q7J5XOA3HKdJHdZ7lh0cjHu0K0rEKzrei2pQrk06oyZSS4QRqNdWwhCxw+m5wcDodI6jktsVyi/wY5GotX5JNjbuLMwLmkciRpyMcEm3uXUjlV/a0QAQF7YYQyvVDSTGsxyELnu3R0dKz3BtoGNPmMToq3bqox1Wm+mZDqbfQgnerjFMGLKp8GnFPIQIH3u/NDNTAbo6ljiZ47104sTizmyZlJUEdsfI3sEm29p/p8k7St3ANaRBgacUq0s3l7oHJbnKN1G6HsVDwhvlP5ircWFSfZlO21u6mDkZE9t6dCcipryH0/wAyg7Rv1b6oivadVw8zRI7aKgxuyqHKcs79yKGnZVUnEwrTGK2amJ4Qq0UnDgU7jDvs/UI8B5QxYXAaTzjRQb181HHquoNgyVGqu1Kg2oL9nr7w7eqzU+Ll7DKo4YAXETrvUbC3fZhO1XRJJUDF5gJ3pitUnQjgvRUDgSEioNd6NjpFRUImEy4pysfMU3IVALcdAmCU44iICaKAEIp2OnI+OYVEzDKrtQ2RE7wiPZKp4VN4dAObcSEmFFuc07inGNf1Ue4uznzeKGiN0hNUMYFN0Pq5pGnRIkvLdro3IBxWc7+5+aNqWNs3ZhPwQjiLHPc8jWSTw5poXkr8DP8AeGd0a4letY2SeKGsHsMpzOjNwEhWl7RNVuUwIOmoQ1bJkO08ZpH7xVDiNLPVOXUu3cTrugc1Jbg1Q8j/ADJ6rYutqZLQPGeIkEfZsO+P4yOPAdSnxBNFjs/VbbO8IEPrOPnI1ZTgaU2niQN55noIOMAo6tJ3ulxP8LZKANhcEqPuGkNljB5uQ/crVqdPKScoEtI7DksckdOR0Y5q6Mp2qtX17l7uBJM9BJ+Sq7VjKoDSyAdQROhO/wCKP8Wsc1AhsZqh8MHk06vd6NB96nWGDUqVMANEEAyQXEmOug0hcsJPikuzqklbZnZwlzRGjm79P2SqdmAPK3qW8uoRXf0KOR7xTJyguIaMj4BE6TDt6q6MACoDnouMZ4IdTd+GoN47rqg8mJ8qOaax5Y1ZGwypI038f3UnBcUaLo24HmLc06znAJyRygqTjOG+GBXZ5TvP5hrw569J7oZtnvt7lt0BmY9wmN7HaaeomPULo9qM37kf0c3uSjF4p/sPnXgynzcf0lSqlbSjq2HbiN5kfeQjiuI1G3D2My+GfO0kakOaCD8YVe3G60ZvJIIA04RAQyFFl/tC4tq1C00soa0GTJ1n/t9U8zEC91N0sDBTYGtYZLdfvnn+yCMbvHEscYJyjt6JvDcYq0w8tgHQ7lFbs1S/jQdCqA5/nO5/+oJVOpJZFTKQ8weAJA39AgiptDXyg6ayDpvkqTbYzVfV8OQBqdRxhXZn7bQbXr4L/NmPl14HqFU3NwWtJUOhfVMrs1RhIgDsoN5d1C2SWkDlzTj0TKNsmPv9dQNU6/CTeNLGkNIIO5DorOc4ADkSi/Zm8DS6RwA3ppg409DGK7E7vBhoDQHTJl3NCWJbP3FE6skcxqtbtMQpuLhmbp1CEMXrtfWcfGgBxgB0AdUtFRcgXsJbTgggzxVnhlNr2vzwSCIXtdgLQzM0gGQS4SJ3pupYUhqKoB6OUaNbfkfvBSpgRAPxVLWxGHGAPVPOt259XNOu8ulde29M6zT9DCGNaIf1bxPPBaOm5OXGFtY0Pc4gHcSprKzWsy52RuI6JjEGGu5jGmWx5R1T0TvyMYbTph85mujgVaPpWpPD4IffYZCWmo0EbxO5c23b/mM96V0PjfkIKexN3+GP5ktuwl3+Ef1LZKdNPNprPky6MXOxF396n2hwXg2IuONJ/vC2otSfAHMp2xUY6zZO4AP2L+moXn/TN5/kO/qC2VtHqUsU0+TFRibtk7v/ACHejgr/AAnDHUaQZVs3PdJ829aY6mE0bQc3e9PkyXGwLAa0ACzeD2EJ9ha8EOtXz+WZ9UVHDx+J/vS2Wkfed70+bJ4fkGrNxpt8lvUbJ+6Bw5p++xcUKbqr2uZ5HBodvc86NAG8kkohcwMBc50AAkk7gBqSsS2m2mNesXz5N4DuDZhm7cdx9Spk3JUaY4U7NFZetaaLiJb4I8sjR1V0H1Hh/EpnG9omUIzhxBiC0g5m6EHK7Q6KnswX2dJ5GWWwN8hoc5zDr0IPqkspNumuoPE1aUvp6xI+9TzHgDJ7LHFiuX0bZstL7PcXxBjrapUa4lrnUqe6C3MZcI9Ad5VLs/dtY91EkhtUGJ4ujyn13e5LxXEKWQW1MA0mGXEffcdCR0HDsqDEKBYyJJadWPG9pGq9H27g/J5qyVNeA9w+oatpXoO1dRzNHVo1Z8sqFK7KlJrWk5WvcC5xEjK3XKB7jHRE2zlb7Yk/+e3znkdxJ+fvQtbXOR1S2qH2XPYM2o0Jy+m5Y+ldpwZv6tU4zRa4ZXc/7N9FtepSAaHNcGl1NwBY4To4QeCmPwyoQWjDnj1CH8MgNY9hLTTDWS7e0DVod+Jsbj0Wh4btJcmvToV2FhMAuBblMxlMRqCJ4rWeB1yRhHOuXFgXcbO13R/c6ggREj90/SwSoxsfUHGeMiVsTmKlxnGhQcGBoc6JMmAJ3DvxXK5Udag3ozN2GVIj+z3adkq3w6qXgmxLAfae7c1vE9e3FHtHahuUmq1jfww4Ge4G5UNXaCrc120abiGlwzOjyBs7uQ+al5fg0WB+Spu6dw6GtsXeGyQwabj948yd5Tf1e6Lcv9n6ei1ahbBjQ0bhp/ylliu2ZuOzJqNhdtMiwGvUJbrO+1izaJ6j91quRJdTRbDiZezA67mwbQg8SHNE/FMVNkazzpb5f5wtSdT1XtNnNK2HEyU7DXhOlOkB1eZ/0r07CXv4KP8AWf8AatfAC9LQnyYcUY87YK9/DR/rP+1Nv2Evfw0f6j/tWxloTdRo5I5MfFGMu2IvfwUv6/8Ahda7MX1M6Mpnu75aLXqtNvJRKlKTwS5MfEyC52Mu3uLiGSTJ8yY/6IuuTPetddbBMnKNEuQUELWjinAFGNTmD6arx1xpulRZZKJC8lMU3mNRHRetf0TsRIanAU0ClhUSeuTZK8cei8ceSAFthKLk20rwxxKBAj9JuLGnbmiDBePN+UkNA9TPuWMXr5cegzIm+kLGDWuI+7mDo4hoGWm0+kvP/qIUYc2bqPgAT+wVRNHrRqdlcPdaUWu+9UYw9hR4qiqYhlex0wS2HEfjpk0n/Fittg2l9kKjwf8AEDKSd+RmUkcuXoqTE7LNULRwdULSP43Fx+MqvTXLI6Ob1XGONciKKLXTkcOy8p03t8j2ktPAcOoXn9iOjNDh1EjcrjZZrmPc1zy8ETAGYzoA0u4Nnp6rvknFW0efGSk+KdkjBa58anyZQrMjdAgZBHYFQLqqRch8w18F0QSCNHHLx0yn1XtwbmnX8VxbLHSWMbDS3jpJMwearW1xUyk/dcR6fd+Ej3LnUHHJa1Z1Oanjae6Ly7w9jar/AA3NLHZmncAQdQQDuEk6cwkWV05xBboaZGSTJ8p1YeI10nmvbBzYc0jR2h4nXSRKHa1w6jclrRmzlrsn4i72snWQXdpXROSjXI5oRc2+PZv/ANfb4IrEw0tDveN3eVmeK3xL3Oe6S4k6fDVSLjFnmlTouOjBw4k8TzhDt9JBk9uZJ3ADj2Xi5p3Kke5hhUbkeXF9wgGeQMot2PszcsY7MGMpu87Bq534QeDZInjoqvCNhbitBrRSYdddXx0YOPf3LRcIwmla0/CpNgbyTqXHdJKcIO7YTmqpE4hckF/QrwP6FbnOLzJLnLx8pL3acEAeOcFybA5kJR4JDHM0L0VFwXjSgDi/sm87o4LqpcJhuZeUyY1bCQyPVuG7pEqI9/VSrssbq5QjVaZO7kgYnxFHc9dUeZMehUMAnUv16JCCymQdw0XrmidwVW2rcfga0cs0/onqVaqTBZA7hTZZOGUcQuL2ncQVHex3IL2lRa0RCdiodBPJOhpjjKZBhKFVOyaOII1Xhg7ivHVCOATT6vboAixUOkHmFDx26FO3q1C72WO+OicNc8dJWcbd7TVDVq2wgUmNyu5ve5ocCf4Ry6JrY12Z5iVwX1C47ySV5ZM0JOgG/wDRMOEySvHu4cFoO9mq2F82nhtsKfMz3g7+5KAxij2Vakn2iXD+Fx/+J0kL3AL57muoEyNajejhAPwTO0NuadUg6GGu/leJB+fuThDjHkvkxnPnPg+qLT+3KrWMD4cXDPHQzEx0Vjg20Hhva4Ui3UAxrIO8KNg1lSfTbWcdS2IOkZfLp06rwXDc3hUm5nHlw5yeC7YOVblo4MkYcqUd/oNcSsKdVpuWPADxmywZJPAa70HOsKdMumq2ZkCYOp0nkifD6zzRbQOUANDTAzEnjDjEe5CuO4ATXbldDXtMzJIywPjPwUzm1C34KxwTyUn3/osXADyxhz6wC3jCuGYe3MKrmjOG5Z5TqY5aprDrJtBsDfxPE911xeE6Bedn9U5qkepg9KoPk+xyu/KJmI58IRNsrs9LmXVdvmJzUWOGrGj/AMjh+N2kcgVnzdpGUrhhdS8akxwLhMFzhxHAgHgd57LZMOxOnctpV6TszHtcWn1AII4EEEELPHjrbNMmS9ItIXjuibDz3XpetjA9z8wvc6bleSAgBbiCm8q7NCZq1eqAE1WGd8JyncADfMJA1Sm6cBCQDzahI3r1rk3mHGF4YKYx4uUarUKUSCN6bdA4kpWMi3NuTv8A3UerSE71LrBrhrPvUCpXAJEaf/eKQ6GazwOIKhGs0cPgVKqtB1UV8g6SkIJmPPNdmJ3LlyhFs8Bd+IL1r3E6gQuXKhC3kAAle5wOS5cmIbddSYj5QkPrNPcct65cgkSH6xMLIfpRt8l6Xb87GH1iJ/8AafcuXKo9gBrTxXhXLloIew+v4dRruR17HRS8avPGqSJJ0BnfO4BcuTsVbsm0LOqacMBc7Ro19lkkwB1PHolUGOtnAE/ezGN2bQOHaAPcvVy6HBJWcccjlLiwmsbgNlxOm/0TF1iMnOezRyC9XLH1U2oKPyb+ixpzcvgh1sRLuKZvnn6tUeJEQNN8FwDj0MErly5MME3s7c2RxjoHW0Ps828SQCP1Wl/Q/ejLVoEyWxUaOAD/AG49Q0nuvVy6H0c9ml5tE34mq5coGetcOvqkhomZXLkAeOcOabqAHiNF4uSA5vpCVmBGhlcuQMQxwOhiU0/xMwhzQ3lC5clY6OrVSB5nATyCimqdSHCORELlyQyDUvX5gHlkcNYJUetdtdpTqMJndIMLlyAIDrgic7teEDdCUy7pR7RPquXIA//Z",
      order: 2
    },
    {
      id: "b3",
      title: "Segunda Edición del Open Day Internacionales",
      subtitle: "Un espacio para compartir experiencias alrededor del mundo",
      image: "https://www.utn.edu.ar/images/Secretarias/Internacionales/1-fotos.jpg",
      order: 3
    }
  ],
  news: [
    {
      id: "n1",
      date: "2026-04-25",
      title: "Convocatoria Programa PILA - Virtual y Presencial",
      description: "El Programa de Intercambio Académico Latinoamericano (PILA) abre sus puertas para la movilidad de estudiantes, docentes y gestores en universidades de toda la región. ¡Sumate a una experiencia intercultural única!",
      image: "https://www.programapila.lat/wp-content/uploads/2021/09/Logo-Horizontal-scaled.jpg",
      category: "Relaciones Internacionales",
      featured: true
    },
    {
      id: "n2",
      date: "2026-04-24",
      title: "Pasantías Internacionales IAESTE 2026",
      description: "IAESTE ofrece pasantías técnicas rentadas en el extranjero para estudiantes de ingeniería. Obtené experiencia profesional en empresas de más de 80 países y potenciá tu carrera técnica.",
      image: "https://www.utn.edu.ar/images/Secretarias/Internacionales/flay-iaeste.jpg",
      category: "Relaciones Internacionales",
      featured: true
    },
    {
      id: "n3",
      date: "2026-04-20",
      title: "Programa UTN-DAAD: Estudiá Ingeniería en Alemania",
      description: "Becas de intercambio académico y práctica industrial en Alemania. El programa incluye cursos de alemán e integración universitaria para estudiantes de grado de la UTN.",
      image: "https://www.utn.edu.ar/images/Secretarias/Internacionales/logo---programa---daad.png",
      category: "Relaciones Internacionales",
      featured: true
    },
    {
      id: "n4",
      date: "2026-04-18",
      title: "Movilidad Académica PILA 2026",
      description: "Se encuentra abierta la convocatoria para el Programa de Intercambio Académico Latinoamericano. Destinado a estudiantes de grado que deseen cursar materias en universidades extranjeras asociadas.",
      image: "https://www.utn.edu.ar/images/2022/09/16/pila-virtual.jpg",
      category: "Relaciones Internacionales",
      featured: true
    }
  ],
  links: [
    { id: "l2", title: "Programa de Lenguas UNSAM", icon: "BookOpen", url: "https://unsam.edu.ar/comunidad/lenguas/", colorClass: "text-blue-600" },
    { id: "l3", title: "NEWSLETTER INTERNACIONALES", icon: "FileText", url: "https://drive.google.com/file/d/1rozUuo92TTFg8UyWTgcpbvoqcFAmNab5/view", colorClass: "text-red-500" },
  ],
  stats: [
    { id: "s1", label: "Alumnos en intercambios internacionales", value: 4, order: 1 },
    { id: "s2", label: "Acuerdos con universidades en Europa", value: 5, order: 2 },
    { id: "s3", label: "Acuerdos con universidades en America", value: 2, order: 3 },
    { id: "s5", label: "Experiencias internacionales", value: "+50", order: 4 },
  ],
  calendar: [
    { id: "c1", date: "2026-05-15", title: "Comienzo Inscripción a Exámenes", type: "Académico" },
    { id: "c2", date: "2026-05-25", title: "Feriado: Día de la Revolución de Mayo", type: "Feriado" },
    { id: "c3", date: "2026-06-10", title: "Semana de la Ingeniería", type: "Evento" },
    { id: "c4", date: "2026-06-30", title: "Fin de Cursado 1er Cuatrimestre", type: "Académico" },
    { id: "c5", date: "2026-07-13", title: "Inicio Receso de Invierno", type: "Académico" },
    { id: "c6", date: "2026-07-24", title: "Fin Receso de Invierno", type: "Académico" },
    { id: "c7", date: "2026-08-17", title: "Feriado: Paso a la Inmortalidad de San Martín", type: "Feriado" },
    { id: "c8", date: "2026-08-30", title: "Muestra de Carreras UTN-FRRe", type: "Evento" },
    { id: "c9", date: "2026-09-21", title: "Día del Estudiante (Sin actividades)", type: "Feriado" },
    { id: "c10", date: "2026-09-30", title: "Jornadas de Investigación y Posgrado", type: "Evento" },
    { id: "c11", date: "2026-10-12", title: "Día del Respeto a la Diversidad Cultural", type: "Feriado" },
    { id: "c12", date: "2026-10-25", title: "Exámenes Finales Noviembre - Turno 1", type: "Examen" },
    { id: "c13", date: "2026-11-20", title: "Día de la Soberanía Nacional", type: "Feriado" },
  ]
};

// Función para simular el tiempo de espera de un servidor (latencia)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
  // Obtiene los banners del carrusel principal, ordenados por prioridad
  async getBanners(): Promise<Banner[]> {
    await delay(300);
    return [...MOCK_DATA.banners].sort((a, b) => a.order - b.order);
  },

  // Obtiene las noticias para la sección de actualidad
  async getNews(): Promise<NewsItem[]> {
    await delay(400);
    return [...MOCK_DATA.news];
  },

  // Obtiene los accesos rápidos (Sysacad, Campus, etc.)
  async getQuickLinks(): Promise<QuickLink[]> {
    await delay(200);
    return [...MOCK_DATA.links];
  },

  // Obtiene los números destacados para la franja de estadísticas
  async getStats(): Promise<Statistic[]> {
    await delay(250);
    return [...MOCK_DATA.stats].sort((a, b) => a.order - b.order);
  },

  // Obtiene las actividades del calendario
  async getCalendarActivities(): Promise<CalendarActivity[]> {
    await delay(350);
    // Devolvemos ordenadas por fecha
    return [...MOCK_DATA.calendar].sort((a, b) => a.date.localeCompare(b.date));
  }
};
