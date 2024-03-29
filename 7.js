function processRawInput(rawInput) {
    return rawInput.split("\n").map(line => line.split(" "));
}

function getDirObject(processedInput) {
    let dirs = {};
    let lsIng = false;
    let currentDir = [];
    let currentDirFiles = [];
    processedInput.forEach(line => {
        lsIng = (line[0] != "$")
        if (lsIng) {
            const content = (line[0] == "dir") ? `${currentDir.join("/")}/${line[1]}`.replace("//","/") : parseInt(line[0]);
            currentDirFiles.push(content);
        } else {
            if (currentDirFiles.length > 0) {
                dirs[currentDir.join("/").replace("//","/")] = currentDirFiles;
                currentDirFiles = [];
            }
            if (line[1] == "cd") {
                if (line[2] == "..") {
                    currentDir.splice(-1,1);
                } else {
                    currentDir.push(line[2]);
                }
            }
        }
    });
    if (currentDirFiles != []) {
        dirs[currentDir.join("/").replace("//","/")] = currentDirFiles;
    }
    return dirs
}

function applyTooBig(folder, dirObject, dirSizes) {
    dirSizes[folder] = "Too Big";
    Object.keys(dirObject).filter(folderToCheck => !(Object.keys(dirSizes).includes(folderToCheck))).forEach(folderToCheck => {
        if (dirObject[folderToCheck].includes(folder)) {
            dirSizes = applyTooBig(folderToCheck, dirObject, dirSizes);
        }
    })
    return dirSizes
}

function getSizes(rawInput, limit) {
    let dirObject = getDirObject(processRawInput(rawInput));
    let dirSizes = {};
    while (Object.keys(dirObject).length != Object.keys(dirSizes).length) {
        Object.keys(dirObject).filter(folder => !(Object.keys(dirSizes).includes(folder))).forEach(folder => {
            let runningTotal = 0;
            dirObject[folder].find(file => {
                if (typeof file == "number") {
                    runningTotal += file;
                    if (runningTotal > limit) {
                        dirSizes = applyTooBig(folder, dirObject, dirSizes);
                        return true;
                    }
                }
                return false
            });
            if (dirObject[folder].every(file => typeof file == "number") && !Object.keys(dirSizes).includes(folder)) {
                dirSizes[folder] = runningTotal;
                Object.keys(dirObject).filter(folderToCheck => !(Object.keys(dirSizes).includes(folderToCheck))).forEach(folderToCheck => {
                    if (dirObject[folderToCheck].includes(folder)) {
                        dirObject[folderToCheck] = dirObject[folderToCheck].map(file => (file == folder) ? runningTotal : file);
                    }
                })
            }
        })
    }
    return dirSizes;
}

function getTotalSize(dirSizes) {
    let finalTotal = 0;
    Object.keys(dirSizes).forEach(dir => {
        if (typeof dirSizes[dir] == "number") {
            finalTotal += dirSizes[dir]
        }
    });
    return finalTotal;
}

function getSmallestToDelete(dirSizes, totalSpace, spaceNeeded) {
    const minimumSize = spaceNeeded + dirSizes["/"] - totalSpace;
    if (minimumSize < 0) {
        console.log("No deletion needed!")
        return 0
    } else {
        const sortedSizes = Object.values(dirSizes).filter(size => typeof size == "number").sort((a, b) => a - b);
        return sortedSizes.find(size => size > minimumSize);
    }
}

smallInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

rawInput = `$ cd /
$ ls
115454 dwdllt
dir jmdf
dir jrgzmphz
dir pdzrzbtf
177917 pvlvsfjw.qvw
dir qlpvwf
30151 qvrwp.vsv
73443 wzbtj
$ cd jmdf
$ ls
228633 gdbv.qjv
252639 pphmpmms.rrn
dir rgrcs
$ cd rgrcs
$ ls
34044 cqldc.nmr
dir drg
dir gcfth
266939 phcfhh
$ cd drg
$ ls
200446 cjclf
94067 phcfhh
121940 twsswl.nzb
235672 vmzlzqgc.ppj
179660 zqbczf
$ cd ..
$ cd gcfth
$ ls
49306 bsqqhqv.thv
dir zsmhsbp
$ cd zsmhsbp
$ ls
152706 vmcf.rsw
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd jrgzmphz
$ ls
271182 rtwvdwrv.jbn
$ cd ..
$ cd pdzrzbtf
$ ls
dir nrnhgwgn
dir pdzrzbtf
dir qlpvwf
dir tfzqt
dir zccqrjcb
dir zrffd
$ cd nrnhgwgn
$ ls
dir fqgbzm
254817 szps
95107 zws
$ cd fqgbzm
$ ls
dir shgwgwlh
dir sjl
$ cd shgwgwlh
$ ls
dir schpcdz
$ cd schpcdz
$ ls
102914 mbnlh.vrb
$ cd ..
$ cd ..
$ cd sjl
$ ls
dir hvndtjs
$ cd hvndtjs
$ ls
212787 gdbv
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd pdzrzbtf
$ ls
90638 bfcprq
110295 ddwlgdcm
dir mhcqp
dir mrl
dir nsr
191768 phcfhh
16986 rfc.nzg
dir zsmhsbp
$ cd mhcqp
$ ls
dir gdbv
dir gvbpsjgr
dir jgdm
255371 npm
81840 pdzrzbtf.rwr
278669 twsswl.nzb
dir zsmhsbp
$ cd gdbv
$ ls
256078 pdzrzbtf.lbd
50204 tfzqt
$ cd ..
$ cd gvbpsjgr
$ ls
252865 vmzlzqgc.ppj
$ cd ..
$ cd jgdm
$ ls
140338 mfrtr
$ cd ..
$ cd zsmhsbp
$ ls
dir gqrppn
188529 zqbczf
5398 zsmhsbp.sdr
$ cd gqrppn
$ ls
88583 gdbv.lmr
$ cd ..
$ cd ..
$ cd ..
$ cd mrl
$ ls
dir jstrsfww
dir jvmhvnw
dir nct
51489 qlpvwf.wmt
dir rgdjs
dir rqrh
146210 twsswl.nzb
dir wjdmf
32418 zqbczf
$ cd jstrsfww
$ ls
dir qfr
59109 tfzqt.fwc
146720 zpsjh
176304 zsmhsbp.jtq
$ cd qfr
$ ls
196830 pdzrzbtf.gdd
$ cd ..
$ cd ..
$ cd jvmhvnw
$ ls
dir njjnlwb
197634 tfzqt.ggg
$ cd njjnlwb
$ ls
102868 gdbv.qhp
248921 pmvb.tzt
45669 twsswl.nzb
$ cd ..
$ cd ..
$ cd nct
$ ls
dir gtg
dir jcmg
dir jqpjfdt
$ cd gtg
$ ls
dir fgnnr
36970 hbrh
dir mvvvv
175582 qlpvwf.cfc
278603 rfmcrmmm
dir tfzqt
dir vlvgzd
$ cd fgnnr
$ ls
249152 fbhzmdh.gld
149139 ztzd.bvb
$ cd ..
$ cd mvvvv
$ ls
dir czgn
dir mmrm
dir rsnt
dir tfzqt
$ cd czgn
$ ls
dir drsz
dir plvgpdf
dir tfzqt
dir zsmhsbp
$ cd drsz
$ ls
179461 vmzlzqgc.ppj
$ cd ..
$ cd plvgpdf
$ ls
dir mzhlg
135115 phcfhh
dir pwms
103203 qlpvwf
261559 thppp
23854 vmzlzqgc.ppj
$ cd mzhlg
$ ls
132666 cpfjczb
148885 hfjcl.zfd
dir hnpvzrc
207561 jdcwbm
$ cd hnpvzrc
$ ls
51809 ltlq
57823 sfpb
$ cd ..
$ cd ..
$ cd pwms
$ ls
264380 wbvmvd.ftq
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
dir grrs
dir hdmvwhg
dir hhd
dir mjg
dir tfzqt
171786 vmzlzqgc.ppj
128963 zqbczf
$ cd grrs
$ ls
176906 mjjmw.hcm
$ cd ..
$ cd hdmvwhg
$ ls
96008 clfgs.tdl
74485 jctgv.lrh
49182 qlpvwf.fzr
168715 zqbczf
$ cd ..
$ cd hhd
$ ls
dir frr
217885 gdbv.fdl
172477 hwhsnrch.vbb
$ cd frr
$ ls
29837 qlpvwf.zhc
$ cd ..
$ cd ..
$ cd mjg
$ ls
dir crrd
dir ggtrt
dir qlpvwf
232241 rfsbb
dir rnqbvqsc
196700 vmzlzqgc.ppj
$ cd crrd
$ ls
74929 mhwpjh.tgs
176202 qcjt
20283 vsgnncd.lcf
$ cd ..
$ cd ggtrt
$ ls
68252 ltlq
$ cd ..
$ cd qlpvwf
$ ls
244340 hhpvrtsj.lzj
$ cd ..
$ cd rnqbvqsc
$ ls
205772 fwf.sdc
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
62840 bdpg
94996 cghrntl.bfz
250104 glcnwwf.nsq
758 phcfhh
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
dir glsw
dir rjngld
21420 wcbmdnwq
228503 zpsjh
$ cd glsw
$ ls
dir jfr
67735 mstwzph.fll
243304 twsswl.nzb
10524 wjd.crc
$ cd jfr
$ ls
199001 bntt
$ cd ..
$ cd ..
$ cd rjngld
$ ls
18949 zsmhsbp.brc
$ cd ..
$ cd ..
$ cd ..
$ cd mmrm
$ ls
dir cgvjppn
240935 lsq.qvr
20136 ltlq
267402 nscfrsj
119766 plwgsrwp.zqb
205281 ppjrdglq
$ cd cgvjppn
$ ls
dir rhhdwdbp
dir zjstjwhw
$ cd rhhdwdbp
$ ls
dir tfzqt
113213 tfzqt.fcl
110170 twsswl.nzb
$ cd tfzqt
$ ls
64921 qnczrgp.zlq
$ cd ..
$ cd ..
$ cd zjstjwhw
$ ls
dir bphlp
dir spvdg
dir zsmhsbp
$ cd bphlp
$ ls
259913 pdzrzbtf
75734 zqvh.szv
$ cd ..
$ cd spvdg
$ ls
dir nrndc
$ cd nrndc
$ ls
dir hjmjntd
$ cd hjmjntd
$ ls
35124 zqbczf
$ cd ..
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
135331 ppbqhbv.zbn
272216 tpd.mjv
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd rsnt
$ ls
257948 ltlq
dir pdzrzbtf
11840 phcfhh
dir phnzh
159364 twsswl.nzb
262458 vmzlzqgc.ppj
166013 zsmhsbp
dir zvhczwj
$ cd pdzrzbtf
$ ls
dir gbs
275384 gdbv
279069 lnqcd.zpt
140345 nbspmpf
dir pdzrzbtf
246481 zsmhsbp.ddq
$ cd gbs
$ ls
96981 fsnfzl.fhn
$ cd ..
$ cd pdzrzbtf
$ ls
90739 jvqtcpt
dir pqnvhlmq
dir rwdmdrj
183673 twsswl.nzb
213929 vmzlzqgc.ppj
dir zsmhsbp
$ cd pqnvhlmq
$ ls
234953 ctqbvlf
$ cd ..
$ cd rwdmdrj
$ ls
157525 fmpmwj.nss
$ cd ..
$ cd zsmhsbp
$ ls
131119 ltlq
$ cd ..
$ cd ..
$ cd ..
$ cd phnzh
$ ls
251337 vtpfth
$ cd ..
$ cd zvhczwj
$ ls
dir zdblhn
87280 zdfglcz.rns
dir zlcwrt
$ cd zdblhn
$ ls
87731 zpdddqm
$ cd ..
$ cd zlcwrt
$ ls
26033 cnqgjtch
8416 gdbv
$ cd ..
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
111014 qgd
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
dir bhbzst
dir nllndl
88441 nzzsfm
76785 phcfhh
dir qvzcg
dir rwzjjnld
116958 vwl.cgd
$ cd bhbzst
$ ls
165841 fbmsb.htd
101685 mmptd.mln
$ cd ..
$ cd nllndl
$ ls
168213 dsshjc.jqb
243999 gdbv
131510 ltlq
274641 swcs.hwn
$ cd ..
$ cd qvzcg
$ ls
15127 qfhzrmfq
239165 qzvsvjj.ntf
170136 vmzlzqgc.ppj
165729 zsmhsbp
$ cd ..
$ cd rwzjjnld
$ ls
111118 mnrn.qqp
dir nfhwqc
171010 tvqrn
$ cd nfhwqc
$ ls
dir gdbv
$ cd gdbv
$ ls
216229 fdmn.gtv
257180 fjvttjp.pgb
76279 gdbv.qhf
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd vlvgzd
$ ls
dir cdhlbs
273460 gjszt
253619 ltlq
dir tfzqt
105724 ztswzcnh
$ cd cdhlbs
$ ls
10761 qlpvwf
$ cd ..
$ cd tfzqt
$ ls
259288 twsswl.nzb
$ cd ..
$ cd ..
$ cd ..
$ cd jcmg
$ ls
dir bwg
216164 mjqh.wbl
$ cd bwg
$ ls
221413 lcmj.lfp
$ cd ..
$ cd ..
$ cd jqpjfdt
$ ls
39610 hbpfnfqg
239450 tfzqt.qlw
$ cd ..
$ cd ..
$ cd rgdjs
$ ls
dir gtnwrrgm
dir lvvbt
dir lwwgnsqg
117539 mcrrg.fms
29606 ndsq.tbd
16306 vmzlzqgc.ppj
dir zsmhsbp
$ cd gtnwrrgm
$ ls
11216 ltlq
$ cd ..
$ cd lvvbt
$ ls
181316 jsjgtq.vrv
$ cd ..
$ cd lwwgnsqg
$ ls
dir gdbv
$ cd gdbv
$ ls
154097 qlcqppz.pgh
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
106793 ltlq
133848 twsswl.nzb
$ cd ..
$ cd ..
$ cd rqrh
$ ls
204650 fscjmmw
28331 hrfwh
79892 nbfl.qmc
95829 vmzlzqgc.ppj
$ cd ..
$ cd wjdmf
$ ls
dir pvsnp
$ cd pvsnp
$ ls
210793 tfzqt.vht
126762 vmzlzqgc.ppj
$ cd ..
$ cd ..
$ cd ..
$ cd nsr
$ ls
251991 dqhrjb
67339 fpjffpb.gsp
58452 gdbv.sjc
dir ggzlnhnn
60261 ltlq
dir qlpvwf
$ cd ggzlnhnn
$ ls
193631 pdzrzbtf.sdp
153238 vmzlzqgc.ppj
$ cd ..
$ cd qlpvwf
$ ls
90117 gdbv.dvl
53684 trtbg
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
dir dnbg
dir rcjq
$ cd dnbg
$ ls
135586 fzpnzqt
$ cd ..
$ cd rcjq
$ ls
19420 htpttdj.mjl
$ cd ..
$ cd ..
$ cd ..
$ cd qlpvwf
$ ls
dir hdphwm
53357 lbgfh.nvb
126485 nmjcwr
dir nrcchmg
116374 phcfhh
150924 twsswl.nzb
dir wnmrcvqd
$ cd hdphwm
$ ls
149373 nmh.ndj
dir nmtf
233670 pdzrzbtf
91795 pdzrzbtf.bcg
121202 pdzrzbtf.hjr
dir swdrz
87747 twsswl.nzb
$ cd nmtf
$ ls
72683 fbsnvl.hmz
$ cd ..
$ cd swdrz
$ ls
10659 njghrcp.pjg
$ cd ..
$ cd ..
$ cd nrcchmg
$ ls
dir gdbv
dir qtvrnsr
133384 twsswl.nzb
$ cd gdbv
$ ls
156442 ppcz.pjm
$ cd ..
$ cd qtvrnsr
$ ls
181954 gnqqdlw.gvm
$ cd ..
$ cd ..
$ cd wnmrcvqd
$ ls
dir gdbv
32559 ltlq
219772 snvgw.dzr
257540 twsswl.nzb
$ cd gdbv
$ ls
35858 phcfhh
$ cd ..
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
dir gdbv
150266 gvfm
123699 hdnvrgdl.ttm
dir hmstmp
dir nssnfrs
dir qjsddcz
274881 zqbczf
$ cd gdbv
$ ls
dir lqct
$ cd lqct
$ ls
268708 djh
$ cd ..
$ cd ..
$ cd hmstmp
$ ls
192327 ghgzf.twb
$ cd ..
$ cd nssnfrs
$ ls
dir hqrwnv
dir tcwwppth
$ cd hqrwnv
$ ls
227553 pdzrzbtf
$ cd ..
$ cd tcwwppth
$ ls
dir tfzqt
$ cd tfzqt
$ ls
dir zsmhsbp
$ cd zsmhsbp
$ ls
123391 sjq.btz
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd qjsddcz
$ ls
68783 ctbmrnns
1972 gdbv.frh
dir tfzqt
174775 zsmhsbp.lqb
$ cd tfzqt
$ ls
dir gjzlcfm
dir plbgr
$ cd gjzlcfm
$ ls
dir gtbhr
$ cd gtbhr
$ ls
dir fhmf
$ cd fhmf
$ ls
274348 zqbczf
$ cd ..
$ cd ..
$ cd ..
$ cd plbgr
$ ls
dir gbz
53867 jprr.ssp
159335 jtzzhr.pmr
$ cd gbz
$ ls
101990 vmzlzqgc.ppj
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd zccqrjcb
$ ls
215886 dhvfttmp
47344 vmzlzqgc.ppj
$ cd ..
$ cd zrffd
$ ls
dir gfjjn
dir hzbvjc
140439 lhcqhgj.zvf
dir rfj
dir vnvbjjj
32199 zqbczf
$ cd gfjjn
$ ls
dir djgqgfs
190874 gdbv.llg
227688 pss.qlh
67798 qlpvwf.mtt
dir qnh
241925 twsswl.nzb
$ cd djgqgfs
$ ls
dir btptqg
63115 gpmzsbl
dir pdzrzbtf
$ cd btptqg
$ ls
129283 bsj
dir hhhg
53181 zqbczf
$ cd hhhg
$ ls
37405 ggjltbrt
190074 phcfhh
$ cd ..
$ cd ..
$ cd pdzrzbtf
$ ls
74240 qqtgwd
$ cd ..
$ cd ..
$ cd qnh
$ ls
230403 wchmf.hhr
$ cd ..
$ cd ..
$ cd hzbvjc
$ ls
dir bdp
dir gmjmdz
dir gtgwz
dir hthvpj
dir pljbqh
dir tfzqt
189834 vzrcph.npm
dir vzwdgw
$ cd bdp
$ ls
dir mcbfsr
179306 vmzlzqgc.ppj
$ cd mcbfsr
$ ls
5683 mbdhddbh.fgp
26401 zszcw.dlq
$ cd ..
$ cd ..
$ cd gmjmdz
$ ls
233472 hnnw.hfq
$ cd ..
$ cd gtgwz
$ ls
22887 fsjp.zdv
dir gdbv
26220 gdbv.zhh
205306 pbqpfbd.nhq
dir tfzqt
dir zsmhsbp
$ cd gdbv
$ ls
15191 qczbv.pcc
69967 zqbczf
$ cd ..
$ cd tfzqt
$ ls
dir gdbv
51485 zqbczf
$ cd gdbv
$ ls
177470 wfcdzgfv.nml
171112 zlwsfh.dnz
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
112049 lgcctz
55379 msnzrtmt.hww
115551 tfzqt.pgq
229037 twsswl.nzb
185407 vmzlzqgc.ppj
$ cd ..
$ cd ..
$ cd hthvpj
$ ls
dir blmdfsh
228962 gdbv
12517 lsfr.ctp
133256 ngjwzc.mjn
$ cd blmdfsh
$ ls
133149 twsswl.nzb
$ cd ..
$ cd ..
$ cd pljbqh
$ ls
dir pdzrzbtf
$ cd pdzrzbtf
$ ls
144413 hqhtpmj.shz
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
13268 cpzglzc
160270 czmzqcln.jgj
$ cd ..
$ cd vzwdgw
$ ls
dir frvhgwf
dir gccpzbb
dir pdzrzbtf
$ cd frvhgwf
$ ls
45940 rmdqrrnr
$ cd ..
$ cd gccpzbb
$ ls
257293 ltlq
178888 wtrrt.dzp
117516 zsmhsbp.shc
$ cd ..
$ cd pdzrzbtf
$ ls
dir sqhgfj
$ cd sqhgfj
$ ls
201634 vqm.hld
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd rfj
$ ls
65683 gslwfb.jbt
90177 ljrlngwl
$ cd ..
$ cd vnvbjjj
$ ls
143164 vmzlzqgc.ppj
276328 zsmhsbp.fzb
$ cd ..
$ cd ..
$ cd ..
$ cd qlpvwf
$ ls
dir mvfj
dir pfbzpj
dir qlpvwf
3285 vmzlzqgc.ppj
dir zsmhsbp
$ cd mvfj
$ ls
dir bwcpw
dir hdd
227359 hlmsrmr.chs
dir lfsdh
197252 ltlq
dir rgwhgjjw
dir tfzqt
94752 twsswl.nzb
dir wngmvdj
$ cd bwcpw
$ ls
133917 dbqcsj
73962 twsswl.nzb
$ cd ..
$ cd hdd
$ ls
dir qlpvwf
245624 vmzlzqgc.ppj
$ cd qlpvwf
$ ls
267126 fqn
$ cd ..
$ cd ..
$ cd lfsdh
$ ls
168993 cwlgghr
72483 hzr
dir rcssg
274227 tnhpdd.fvv
275923 zqbczf
dir zwhqftdf
$ cd rcssg
$ ls
202930 flbbsmp.mvm
$ cd ..
$ cd zwhqftdf
$ ls
36978 jvcw.mnh
264106 rvtndpd.rvn
$ cd ..
$ cd ..
$ cd rgwhgjjw
$ ls
dir gzcbbzj
dir gzgbdd
dir hcplnwnh
$ cd gzcbbzj
$ ls
192705 ltlq
$ cd ..
$ cd gzgbdd
$ ls
6145 zqbczf
$ cd ..
$ cd hcplnwnh
$ ls
28616 ltlq
$ cd ..
$ cd ..
$ cd tfzqt
$ ls
199943 qlpvwf.gvn
$ cd ..
$ cd wngmvdj
$ ls
277127 bgjnfqtf
dir nngnhz
dir pflg
$ cd nngnhz
$ ls
dir cgv
dir lctp
dir qjlvh
$ cd cgv
$ ls
dir cdbdv
dir fzr
dir hrznddsg
$ cd cdbdv
$ ls
203851 hghqwz.vdj
$ cd ..
$ cd fzr
$ ls
17360 phcfhh
$ cd ..
$ cd hrznddsg
$ ls
266754 tftmcrt
$ cd ..
$ cd ..
$ cd lctp
$ ls
7336 nnsdtq.rls
263587 vmrnr.bwv
$ cd ..
$ cd qjlvh
$ ls
67503 zqbczf
$ cd ..
$ cd ..
$ cd pflg
$ ls
dir qlpvwf
$ cd qlpvwf
$ ls
75440 pdzrzbtf
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd pfbzpj
$ ls
15116 bvv.lgd
260475 ltlq
110655 vmzlzqgc.ppj
$ cd ..
$ cd qlpvwf
$ ls
dir wsf
$ cd wsf
$ ls
79880 phcfhh
$ cd ..
$ cd ..
$ cd zsmhsbp
$ ls
dir qlpvwf
$ cd qlpvwf
$ ls
dir przn
$ cd przn
$ ls
167375 npscjw.ndb`;

console.log(getTotalSize(getSizes(rawInput, 100000)));
console.log(getSmallestToDelete(getSizes(rawInput, 70000000), 70000000, 30000000));
