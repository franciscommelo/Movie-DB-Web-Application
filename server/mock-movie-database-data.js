

const fetch = require('node-fetch');


module.exports = {
    
    getPopularTv:function () {
        return  new  Promise((resolve, reject)=>{
            resolve(Popular_TV_Shows)
    })
}
    

                
               
,
    getSearchTV:  function(params) {
            return  new  Promise((resolve, reject)=>{
               if(TV_Show_DB[params]!= null)resolve(TV_Show_DB[params])
               else{
                    resolve({ page: 1, total_results: 0, total_pages: 0, results: [] })
               }
        })
            
    }
                
    }


TV_Show_DB = {
    "The Flash":{
    "results":
        {
            "original_name": "The Flash",
            "genre_ids": [
                18,
                10765
            ],
            "name": "The Flash",
            "popularity": 199.728,
            "origin_country": [
                "US"
            ],
            "vote_count": 4394,
            "first_air_date": "2014-10-07",
            "backdrop_path": "/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg",
            "original_language": "en",
            "id": 60735,
            "vote_average": 7.2,
            "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
            "poster_path": "/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg"
        }
    }

    


}



Popular_TV_Shows = 
{"results":[
 
    {
        "original_name": "The Flash",
        "genre_ids": [
            18,
            10765
        ],
        "name": "The Flash",
        "popularity": 199.728,
        "origin_country": [
            "US"
        ],
        "vote_count": 4394,
        "first_air_date": "2014-10-07",
        "backdrop_path": "/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg",
        "original_language": "en",
        "id": 60735,
        "vote_average": 7.2,
        "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
        "poster_path": "/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg"
    },
    {
        "original_name": "Law & Order: Special Victims Unit",
        "genre_ids": [
            80,
            18
        ],
        "name": "Law & Order: Special Victims Unit",
        "popularity": 141.669,
        "origin_country": [
            "US"
        ],
        "vote_count": 1078,
        "first_air_date": "1999-09-20",
        "backdrop_path": "/cD9PxbrdWYgL7MUpD9eOYuiSe2P.jpg",
        "original_language": "en",
        "id": 2734,
        "vote_average": 7,
        "overview": "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
        "poster_path": "/6t6r1VGQTTQecN4V0sZeqsmdU9g.jpg"
    },
    {
        "original_name": "The Blacklist",
        "genre_ids": [
            80,
            18,
            9648
        ],
        "name": "The Blacklist",
        "popularity": 105.592,
        "origin_country": [
            "US"
        ],
        "vote_count": 1376,
        "first_air_date": "2013-09-23",
        "backdrop_path": "/8b4X7cFOagllHuERcefvDpECwDz.jpg",
        "original_language": "en",
        "id": 46952,
        "vote_average": 7.1,
        "overview": "Raymond \"Red\" Reddington, one of the FBI's most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests: bringing down dangerous criminals and terrorists. In the last two decades, he's made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this \"The Blacklist\". Reddington will co-operate, but insists that he will speak only to Elizabeth Keen, a rookie FBI profiler.",
        "poster_path": "/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg"
    },
    {
        "original_name": "The Simpsons",
        "genre_ids": [
            16,
            35
        ],
        "name": "The Simpsons",
        "popularity": 104.194,
        "origin_country": [
            "US"
        ],
        "vote_count": 3315,
        "first_air_date": "1989-12-17",
        "backdrop_path": "/hpU2cHC9tk90hswCFEpf5AtbqoL.jpg",
        "original_language": "en",
        "id": 456,
        "vote_average": 7.4,
        "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
        "poster_path": "/qcr9bBY6MVeLzriKCmJOv1562uY.jpg"
    },
    {
        "original_name": "Grey's Anatomy",
        "genre_ids": [
            18
        ],
        "name": "Grey's Anatomy",
        "popularity": 103.361,
        "origin_country": [
            "US"
        ],
        "vote_count": 2118,
        "first_air_date": "2005-03-27",
        "backdrop_path": "/edmk8xjGBsYVIf4QtLY9WMaMcXZ.jpg",
        "original_language": "en",
        "id": 1416,
        "vote_average": 7.4,
        "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
        "poster_path": "/jnsvc7gCKocXnrTXF6p03cICTWb.jpg"
    },
    {
        "original_name": "Diriliş: Ertuğrul",
        "genre_ids": [
            18,
            10759,
            10768
        ],
        "name": "Resurrection: Ertugrul",
        "popularity": 101.529,
        "origin_country": [
            "TR"
        ],
        "vote_count": 45,
        "first_air_date": "2014-12-11",
        "backdrop_path": "/lVVsPeqD4sQEBfRH9ELIlUQJibl.jpg",
        "original_language": "tr",
        "id": 66017,
        "vote_average": 7.2,
        "overview": "Ertuğrul Bey and the Knights Templar in the 13th century Alba and step and step with the struggle against brutal Mongols depicts the process of establishing the Ottoman principality.",
        "poster_path": "/rOar34cNLn2sgDH5FmAa1bvMpBv.jpg"
    },
    {
        "original_name": "Rick and Morty",
        "genre_ids": [
            16,
            35,
            10765
        ],
        "name": "Rick and Morty",
        "popularity": 95.038,
        "origin_country": [
            "US"
        ],
        "vote_count": 2364,
        "first_air_date": "2013-12-02",
        "backdrop_path": "/eV3XnUul4UfIivz3kxgeIozeo50.jpg",
        "original_language": "en",
        "id": 60625,
        "vote_average": 8.7,
        "overview": "Rick is a mentally-unbalanced but scientifically-gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty's already unstable family life, these events cause Morty much distress at home and school.",
        "poster_path": "/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg"
    },
    {
        "original_name": "Supernatural",
        "genre_ids": [
            18,
            9648,
            10765
        ],
        "name": "Supernatural",
        "popularity": 89.627,
        "origin_country": [
            "US"
        ],
        "vote_count": 2858,
        "first_air_date": "2005-09-13",
        "backdrop_path": "/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg",
        "original_language": "en",
        "id": 1622,
        "vote_average": 7.8,
        "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
        "poster_path": "/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg"
    },
    {
        "original_name": "Doctor Who",
        "genre_ids": [
            18,
            10759,
            10765
        ],
        "name": "Doctor Who",
        "popularity": 87.88,
        "origin_country": [
            "GB"
        ],
        "vote_count": 1686,
        "first_air_date": "2005-03-26",
        "backdrop_path": "/nfH8SZJVOxcBlFaqqtoqS5hHizG.jpg",
        "original_language": "en",
        "id": 57243,
        "vote_average": 7,
        "overview": "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
        "poster_path": "/cDDb7WA2i7cENhkEEjXEDrXGyNL.jpg"
    },
    {
        "original_name": "Breaking Bad",
        "genre_ids": [
            18
        ],
        "name": "Breaking Bad",
        "popularity": 87.487,
        "origin_country": [
            "US"
        ],
        "vote_count": 4545,
        "first_air_date": "2008-01-20",
        "backdrop_path": "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
        "original_language": "en",
        "id": 1396,
        "vote_average": 8.6,
        "overview": "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
        "poster_path": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
    },
    {
        "original_name": "The 100",
        "genre_ids": [
            18,
            10759,
            10765
        ],
        "name": "The 100",
        "popularity": 85.423,
        "origin_country": [
            "US"
        ],
        "vote_count": 2411,
        "first_air_date": "2014-03-19",
        "backdrop_path": "/yDra4fvpFH6JubOm6yqBAnGA2QS.jpg",
        "original_language": "en",
        "id": 48866,
        "vote_average": 7.1,
        "overview": "100 years in the future, when the Earth has been abandoned due to radioactivity, the last surviving humans live on an ark orbiting the planet — but the ark won't last forever. So the repressive regime picks 100 expendable juvenile delinquents to send down to Earth to see if the planet is still habitable.",
        "poster_path": "/3srv1GQF82pBpBwBAldTn6WHNvk.jpg"
    },
    {
        "original_name": "Family Guy",
        "genre_ids": [
            16,
            35
        ],
        "name": "Family Guy",
        "popularity": 85.111,
        "origin_country": [
            "US"
        ],
        "vote_count": 1936,
        "first_air_date": "1999-01-31",
        "backdrop_path": "/4oE4vT4q0AD2cX3wcMBVzCsME8G.jpg",
        "original_language": "en",
        "id": 1434,
        "vote_average": 6.6,
        "overview": "Sick, twisted, politically incorrect and Freakin' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he's not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.",
        "poster_path": "/q3E71oY6qgAEiw6YZIHDlHSLwer.jpg"
    },
    {
        "original_name": "Game of Thrones",
        "genre_ids": [
            18,
            10765
        ],
        "name": "Game of Thrones",
        "popularity": 84.86,
        "origin_country": [
            "US"
        ],
        "vote_count": 8241,
        "first_air_date": "2011-04-17",
        "backdrop_path": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
        "original_language": "en",
        "id": 1399,
        "vote_average": 8.3,
        "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        "poster_path": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
    },
    {
        "original_name": "Westworld",
        "genre_ids": [
            878,
            37
        ],
        "name": "Westworld",
        "popularity": 83.261,
        "origin_country": [
            "US"
        ],
        "vote_count": 2604,
        "first_air_date": "2016-10-02",
        "backdrop_path": "/yGNnjoIGOdQy3douq60tULY8teK.jpg",
        "original_language": "en",
        "id": 63247,
        "vote_average": 8.2,
        "overview": "A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.",
        "poster_path": "/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg"
    },
    {
        "original_name": "外星女生柴小七",
        "genre_ids": [
            35,
            10765
        ],
        "name": "My Girlfriend is an Alien",
        "popularity": 81.621,
        "origin_country": [
            "CN"
        ],
        "vote_count": 11,
        "first_air_date": "2019-08-19",
        "backdrop_path": "/kCl7piWv3pypgYfyLFi7ZgFGlYV.jpg",
        "original_language": "zh",
        "id": 92779,
        "vote_average": 8.1,
        "overview": "The alien girl Chai Xiaoqi tells the story of Fang Xiaoqi, the overbearing president of the alien girl who died from the \"Cape Town Planet\", who was suffering from the \"rainy weather heterosexual amnesia\". A high-energy hilarious and romantic cross-star love story. The female host Chai Xiaoqi is not only an alien, but also a true-handed witch. Once she inhales the hormones emitted by the males in the earth, she will fall into the \"flowery state\" and suffer from various diseases. The fun and ridiculously ridiculous romance will restore the singularity of the girl in the perfection of the girl. In order to survive on the human earth, Chai Xiaoqi will use his various super powers to solve one accident after another, like a roller coaster. The ups and downs will make the audience hooked. The male lord is cold and is an alternative overbearing president. When it rains, he will forget the opposite sex that appears around him. For this reason, he and the female host will launch various \"fighting and fighting\" laughter dramas. The experience of high sweetness and romance is expected to be Strongly slammed the girl's heart when it was broadcast.",
        "poster_path": "/5e2owvs9TWVsuIacTFxJGPp6KVW.jpg"
    },
    {
        "original_name": "Blindspot",
        "genre_ids": [
            28,
            80,
            18
        ],
        "name": "Blindspot",
        "popularity": 79.766,
        "origin_country": [
            "US"
        ],
        "vote_count": 765,
        "first_air_date": "2015-09-21",
        "backdrop_path": "/q2xEXxqXrWPh5yhBAwpFWwcfiNJ.jpg",
        "original_language": "en",
        "id": 62710,
        "vote_average": 6.7,
        "overview": "A vast international plot explodes when a beautiful Jane Doe is discovered naked in Times Square, completely covered in mysterious, intricate tattoos with no memory of who she is or how she got there. But there's one tattoo that is impossible to miss: the name of FBI agent Kurt Weller, emblazoned across her back. \"Jane,\" Agent Weller and the rest of the FBI quickly realize that each mark on her body is a crime to solve, leading them closer to the truth about her identity and the mysteries to be revealed.",
        "poster_path": "/iAkEexatzMUlCXlbS8Gmvlic9gQ.jpg"
    },
    {
        "original_name": "NCIS",
        "genre_ids": [
            80,
            18,
            10759
        ],
        "name": "NCIS",
        "popularity": 74.451,
        "origin_country": [
            "US"
        ],
        "vote_count": 1013,
        "first_air_date": "2003-09-23",
        "backdrop_path": "/4VuCtYBvZGq6Rk3gloigwlsTefE.jpg",
        "original_language": "en",
        "id": 4614,
        "vote_average": 7,
        "overview": "From murder and espionage to terrorism and stolen submarines, a team of special agents investigates any crime that has a shred of evidence connected to Navy and Marine Corps personnel, regardless of rank or position.",
        "poster_path": "/fi8EvaWtL5CvoielOjjVvTr7ux3.jpg"
    },
    {
        "original_name": "Riverdale",
        "genre_ids": [
            18,
            9648
        ],
        "name": "Riverdale",
        "popularity": 73.265,
        "origin_country": [
            "US"
        ],
        "vote_count": 2385,
        "first_air_date": "2017-01-26",
        "backdrop_path": "/9hvhGtcsGhQY58pukw8w55UEUbL.jpg",
        "original_language": "en",
        "id": 69050,
        "vote_average": 8.4,
        "overview": "Set in the present, the series offers a bold, subversive take on Archie, Betty, Veronica and their friends, exploring the surreality of small-town life, the darkness and weirdness bubbling beneath Riverdale’s wholesome facade.",
        "poster_path": "/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg"
    },
    {
        "original_name": "Vikings",
        "genre_ids": [
            18,
            10759
        ],
        "name": "Vikings",
        "popularity": 72.642,
        "origin_country": [
            "CA"
        ],
        "vote_count": 2509,
        "first_air_date": "2013-03-03",
        "backdrop_path": "/aq2yEMgRQBPfRkrO0Repo2qhUAT.jpg",
        "original_language": "en",
        "id": 44217,
        "vote_average": 7.7,
        "overview": "The adventures of Ragnar Lothbrok, the greatest hero of his age. The series tells the sagas of Ragnar's band of Viking brothers and his family, as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods. Legend has it that he was a direct descendant of Odin, the god of war and warriors.",
        "poster_path": "/ff1zhqvwfS5HvRNcA5UFrH0PA2q.jpg"
    },
    {
        "original_name": "Marvel's Agents of S.H.I.E.L.D.",
        "genre_ids": [
            18,
            10759,
            10765
        ],
        "name": "Marvel's Agents of S.H.I.E.L.D.",
        "popularity": 71.591,
        "origin_country": [
            "US"
        ],
        "vote_count": 1558,
        "first_air_date": "2013-09-24",
        "backdrop_path": "/iWopHyAvuIDjGX10Yc3nn6UEebW.jpg",
        "original_language": "en",
        "id": 1403,
        "vote_average": 6.9,
        "overview": "Agent Phil Coulson of S.H.I.E.L.D. (Strategic Homeland Intervention, Enforcement and Logistics Division) puts together a team of agents to investigate the new, the strange and the unknown around the globe, protecting the ordinary from the extraordinary.",
        "poster_path": "/gHUCCMy1vvj58tzE3dZqeC9SXus.jpg"
    }
]
}







