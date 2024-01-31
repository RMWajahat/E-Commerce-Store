class Features{  //addng features to the query
    constructor(query,queryStr){        //query is the query object and queryStr is the query string 
        this.query = query;        // hm krta tha mongodbobject.find({name: 'apple'});  toh yeh query hai
        this.queryStr = queryStr;       // 
    }

    search(){                                    // jb search karin ga tou ky ahoo ga function hai jo chalna 
        const keyword = this.queryStr.keyword ? {       // agr koi keyword milta hai tou uss keyword kki value uthae ga aur i option mtlb case sensitive nhi hoga
            name:{              // simple jis ka name keyword ka sath attach oo ga wo yahan aa jae ga 
                $regex: this.queryStr.keyword,       // $regex is a mongodb operator which is used to find the matching string
                $options: 'i'                       // mtlb ka samosa ho ya samosasauce 
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }


    filter(){
        const Newquery = {...this.queryStr};     
        const removalList = ["keyword", "limit", "page"];       // yeh keyword, limit, page ko remove krna ka lia hai
        removalList.forEach(key=>{
            delete Newquery[key];           // yeh keyword, limit, page ko remove krna ka lia hai
        });

        // ab sirf category bach gai hai queru mai uss ki base pr search kr dein ga 
        // kaam khatam itna hi kaam tha 

        this.query = this.query.find(Newquery);
        return this;       // return krna ka lia hai ta ka chain mai chalta jae 
    }
}